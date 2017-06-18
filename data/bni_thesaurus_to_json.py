import xml.etree.ElementTree
import logging 
import json

concepts = {}

def normalize_concept(concept):
    return concept.lower().replace("_", " ").strip()

def concept_setdefault(concepts, concept):
    concepts.setdefault(concept, {"id": concept, 
                                    "name": concept, 
                                    "parent": set([]), 
                                    "variants": set([]), 
                                    "n_parents": 0})

def concept_set_label(concepts, concept, label, lang):
    if label:
        label = label.capitalize()
        assert(type(label) == str)
        concepts[concept]["variants"].add(label.lower())
        if lang == "en" and "label" not in concepts[concept]:
            concepts[concept]["label"] = label
            concepts[concept]["lang"] = lang
        elif lang == "fr_FR":
            concepts[concept]["label"] = label
            concepts[concept]["lang"] = lang

def concept_add_parent(concepts, _parent, _child):
    concept_setdefault(concepts, _child)
    concepts[_child]["parent"].add(_parent)
    concepts[_child]["n_parents"] += 1

def concepts_normalize(concepts):
    for k in concepts.keys():
        concepts[k]["parent"] = list(concepts[k]["parent"])
        if not concepts[k]["parent"]:
            concepts[k]["parent"] = None
        concepts[k]["variants"] = list(concepts[k]["variants"])

def tag_type(tag):
    return tag.split("}")[1]

def attribute_name(element):
    return element.attrib[element.keys()[0]].split("#")[1]

def main():
    data = xml.etree.ElementTree.parse("BNI_thesaurus_en_fr.rdf")
    root = data.getroot()
    for concept in root:
        if tag_type(concept.tag) != "Concept":
            continue 
        concept_id = normalize_concept(attribute_name(concept))
        concept_setdefault(concepts, concept_id)
        #print(concept_id)
        for properties in concept:
            #print(" -- ", properties.tag, properties.attrib)
            current_type = tag_type(properties.tag) 
            if current_type == "prefLabel":
                #print(properties.attrib["lang"])
                #print(" -- ", properties.text)
                concept_set_label(concepts, concept_id, properties.text, properties.attrib["lang"])
            elif current_type in ["narrower", "broader"]:
                #print(" * ", current_type, concept_id, attribute_name(properties))
                if current_type == "narrower":
                    concept_add_parent(concepts, concept_id, normalize_concept(attribute_name(properties)))
                if current_type == "broader":
                    concept_add_parent(concepts, normalize_concept(attribute_name(properties)), concept_id)
    concepts_normalize(concepts)
    print(json.dumps(concepts))
    #logging.warning(str((len(concepts), [c for c,v in concepts.items() if len(v["parent"]) > 1])))


if "__main__" == __name__:
    main()

