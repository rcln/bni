import logging 
import json
import sys
import re
from functools import reduce

concepts = {}

def normalize_concept(concept):
    return concept.lower().replace("_", " ").strip()

def concept_setdefault(concepts, concept):
    concepts.setdefault(concept, {"id": concept, 
                                    #"name": concept, 
                                    "parent": "", 
                                    #"children": set([]), 
                                    #"variants": set([])
                                    })

def concept_set_label(concepts, concept_id, labels, preflabels):
    label_list = labels
    if preflabels:
        label_list = preflabels + label_list
    try:
        label = label_list[0].capitalize()
        assert(type(label) == str and len(label) > 0), "Bad label." 
    except AssertionError:
        logging.error("Bad label. -- String: '{}', len: {}, '{}'".format(concept_id, label))
        exit(0)
    #concepts[concept_id]["variants"] |= set([l.lower() for l in label_list])
    concepts[concept_id]["label"] = label

def concept_add_parent(concepts, _parent, _child):
    concept_setdefault(concepts, _child)
    if _parent:
        concepts[_child]["parent"] = _parent
    else:
        concepts[_child]["parent"] = None

def concept_add_child(concepts, _parent, _child):
    concept_setdefault(concepts, _parent)
    concepts[_parent]["children"].add(_child)

def concepts_normalize(concepts):
    list_of_concepts = []
    for k in concepts.keys():
        concepts[k]["parent"] = int(concepts[k]["parent"]) if concepts[k]["parent"] else None
        concepts[k]["id"] = int(concepts[k]["id"]) if concepts[k]["id"] else None
        list_of_concepts.append(concepts[k]) 
    return list_of_concepts

def get_concept_patterns(concept):
    concept_format = re.compile(r"^([0-9.]+)\. (.*) &(.*)")
    try:
        concept_match = concept_format.match(concept)
        assert(concept_match != None), "Pattern error."
        concept_patterns = concept_match.groups()
        return concept_patterns
    except AssertionError:
        logging.error("Bad concept structure. -- String: '{}', len: {}, '{}'".format(concept.encode('utf8'), len(concept), concept_match))
        exit(0)

def get_parent_from_id(concept_id):
    concept_id_format = re.compile(r"([0-9.]+\.)?([0-9]+)$")
    try:
        concept_id_match = concept_id_format.match(concept_id)
        assert(concept_id_match != None), "Pattern error."
    except AssertionError:
        logging.error("Bad id format. -- String: '{}', len: {}, '{}'".format(concept_id.encode('utf8'), len(concept_id), concept_id_match))
        exit(0)
    try:
        current_parent_id, current_node = concept_id_match.groups()
        assert(concept_id == (current_node if not current_parent_id else current_parent_id + current_node)), "Id pattern error."
    except AssertionError:
        logging.error("IDs don't match. -- String: '{}', len: {}, parent: '{}', node: '{}'".format(concept_id, len(concept_id), current_parent_id, current_node))
        exit(0)
    try:
        if current_parent_id:
            assert("." == current_parent_id[-1:]), "Id pattern error."
    except AssertionError:
        logging.error("Bad parent ID. -- String: '{}', len: {}, parent: '{}', node: '{}'".format(concept_id, len(concept_id), current_parent_id, current_node))
        exit(0)

    return current_parent_id[1:-1].replace(".", "") if current_parent_id else '', concept_id[1:].replace(".", "") 

def get_variants(concept_label):
    label_variantes = concept_label.split("/")
    return [] if label_variantes[0] == "" else [nlv.strip() for nlv in reduce(lambda x,y: x + y,[lv.split(",") for lv in label_variantes])]

def main():
    try: 
        concepts_filename = sys.argv[1]
    except IndexError:
        logging.error("\nUsage: {} </path/to/concepts/filename>".format(sys.argv[0]))
        exit(0)
    concepts_stream = open(concepts_filename, "r", encoding="utf-8-sig")
    concepts = {}
    line_count = 0
    for concept in concepts_stream:
        concept = concept.strip()
        line_count += 1
        if not concept:
            continue 
        concept_id, concept_label_string, concept_preflabel_string = get_concept_patterns(concept)
        current_parent_id, current_node_id_remaining = get_parent_from_id(concept_id)
        concept_id = concept_id[1:].replace(".", "")
        concept_variants_label = get_variants(concept_label_string) 
        concept_variants_preflabel = get_variants(concept_preflabel_string)
        #print(current_parent_id, current_node_id)
        #print(get_variants(concept_label_string), get_variants(concept_preflabel_string))
        #concept_id = normalize_concept(attribute_name(concept))
        concept_setdefault(concepts, concept_id)
        #concept_set_label(concepts, concept_id, concept_variants_label, concept_variants_preflabel) #Eng & Fr
        concept_set_label(concepts, concept_id, concept_variants_preflabel, concept_variants_label) #Fr & Eng
        concept_add_parent(concepts, current_parent_id, concept_id)
        #concept_add_child(concepts, current_parent_id, concept_id)
    
    print("},\n".join(json.dumps( concepts_normalize(concepts) ).split("},")) )
    #logging.warning(str((len(concepts))))

if "__main__" == __name__:
    main()

