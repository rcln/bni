import logging 
import sys
import re
import os
import lxml.etree as etree 
from os import path
from functools import reduce
import hashlib

books = {
    #Oeuvres Adam Smith :
    #Histoiredelastronomie.docx : Histoire de l’astronomie in Essais philosophiques, éditions coda, 2006. 
    'cb8b6e849e': { 
        'title': "Histoire de l'astronomie in Essais philosophiques, éditions coda, 2006."
    },
    #LecturesOnRhetoricAndBellesLettres.docx : Lectures on Rhetoric and Belles lettres Liberty fund, indianapolis, 1985. (Traduction Jeanne Szpirglas)
    '0607eb6d87': { 
        'title': "Lectures on Rhetoric and Belles lettres Liberty fund, indianapolis, 1985. (Traduction Jeanne Szpirglas)"
    },
    #Leçons%20sur%20la%20jurisprudence%20Adam%20Smith_usage_reserve.pdf : Leçons sur la jurisprudence, Traduction, préface et notes de Henri Commetti, éditeur Dalloz, 2009
    '7884afbfcf': { 
        'title': "Leçons sur la jurisprudence, Traduction, préface et notes de Henri Commetti, éditeur Dalloz, 2009",
        'skip': 32
    },
    #richesse_des_nations_1.pdf : Recherches sur la nature et les causes de la richesse des nations, Livre I. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.
    '320ec2ace5': { 
        'title': "Recherches sur la nature et les causes de la richesse des nations, Livre I. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.",
        'skip': 14
    },
    #richesse_des_nations_2.pdf : recherches sur la nature et les causes de la richesse des nations, Livre II. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.
    '6b84b59c0e': { 
        'title': "Recherches sur la nature et les causes de la richesse des nations, Livre II. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.",
        'skip': 7
    },
    #richesse_des_nations_3.pdf : Recherches sur la nature et les causes de la richesse des nations, Livre III. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.
    '8c294763ab': { 
        'title': "Recherches sur la nature et les causes de la richesse des nations, Livre III. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.",
        'skip': 7
    },
    #richesse_des_nations_4.pdf : Recherches sur la nature et les causes de la richesse des nations, Livre IV. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.
    '8270bcd4db': { 
        'title': "Recherches sur la nature et les causes de la richesse des nations, Livre IV. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.",
        'skip': 8
    },
    #richesse_des_nations_5.pdf : Recherches sur la nature et les causes de la richesse des nations, Livre V. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.
    'e2a28d4e1d': { 
        'title': "Recherches sur la nature et les causes de la richesse des nations, Livre V. Traduction française de Germain Garnier, 1881 à partir de l’édition revue par Adolphe Blanqui en 1843.",
        'skip': 8
    },
    #Theoriedessentimentsmoraux%20usage%20réservé.pdf : Théorie des sentiments moraux. Texte traduit, introduit et annoté par Michaël Biziou, Claude Gautier, Jean-François Pradeau, éditeur PUF, 1999.
    'f826c7519e': { 
        'title': "Théorie des sentiments moraux. Texte traduit, introduit et annoté par Michaël Biziou, Claude Gautier, Jean-François Pradeau, éditeur PUF, 1999.",
        'skip': 26
    },
    #Oeuvres Francis Hutcheson :
    #système%20de%20philosophie%20morale.doc :  Système de philosophie morale, Traduction Jeanne Szpirglas, éditeur Vrin, Paris, 2016.
    'bf59acd9fd': { 
        'title': 'Système de philosophie morale, Traduction Jeanne Szpirglas, éditeur Vrin, Paris, 2016.'
    },
    '6166219c00': { 
        'title': 'Système de philosophie morale, Traduction Jeanne Szpirglas, éditeur Vrin, Paris, 2016.'
    },
    '982a66db73': { 
        'title': 'Système de philosophie morale, Traduction Jeanne Szpirglas, éditeur Vrin, Paris, 2016.'
    },
    #Recherches_sur_l'origine_des_idées_%5B...%5DHutcheson_Francis_bpt6k6484745m.pdf : Recherches sur l'origine des idées que nous avons de la beauté et de la vertu, en deux traités. Tome I. Traduction française de Marc- Antoine Eidous, Amsterdam, 1749.
    '4a8a218c66': {
        'title': "Recherches sur l'origine des idées que nous avons de la beauté et de la vertu, en deux traités. Tome I. Traduction française de Marc- Antoine Eidous, Amsterdam, 1749."
    },
    #Recherches_sur_l'origine_des_idées_%5B...%5DHutcheson_Francis_bpt6k65225506.pdf : Recherches sur l'origine des idées que nous avons de la beauté et de la vertu, en deux traités. Tome II. Traduction française de Marc- Antoine Eidous, Amsterdam, 1749.
    '9094cbb1cc': {
        'title': "Recherches sur l'origine des idées que nous avons de la beauté et de la vertu, en deux traités. Tome II. Traduction française de Marc- Antoine Eidous, Amsterdam, 1749."
    },
    #Trad_Short_intro..La_Philosophie_naturelle_civile_et_%5B...%5DHutcheson_Francis_bpt6k9633252f.pdf : La Philosophie naturelle civile et morale. Traduction de Marc-Antoine Eidous, éditeur Regnault, Lyon, 1770.
    'dc4e48f2dc': {
        'title': 'La Philosophie naturelle civile et morale. Traduction de Marc-Antoine Eidous, éditeur Regnault, Lyon, 1770.'
    }
}

authors = {
    'adam-smith': 'Adam Smith',
    'francis-hutcheson': 'Francis Hutcheson'
}

types = {
    'primaire': "primary_literature",
    'secondaire': "secondary_literature"
}

def normalizing_xml_from_tika(f_xml):

    tree = etree.parse(f_xml)
    root = tree.getroot()
    namespace = tree.xpath('namespace-uri(.)')
    xpath_ = "{" + namespace + "}"
    head = tree.find("//" + xpath_ + "head")
    body = tree.find("//" + xpath_ + "body")
    pages = body.findall(xpath_ + "div[@class='page']") # One div represents a page in Tika format

    page_number = 0 # Page counter
    min_number_of_tokens = 5
    file_name = path.basename(f_xml).replace(".xml","") # Get file_name
    file_name_hash = hashlib.sha1(file_name.encode("UTF-8")).hexdigest()[:10] # generate hash

    books.setdefault(file_name_hash, {})

    path_info = f_xml.split("/")[-4:-1] # author, type, language
    author = path_info[0]
    author_label = authors[author] #set title
    book_type = types[path_info[1]]
    book_lang = path_info[2].lower()[:2]

    books[file_name_hash]["file_name_hash"] = file_name_hash
    books[file_name_hash]["author"] = author
    books[file_name_hash]["author-label"] = authors[author]
    books[file_name_hash]["lang"] = book_lang
    books[file_name_hash]["type"]= book_type
    
    books[file_name_hash].setdefault("skip", 0)
    pages_to_skip = books[file_name_hash]["skip"] # pages to skip

    books[file_name_hash].setdefault("title", file_name)
    title = books[file_name_hash]["title"] #set title

    for page in pages:
        page_number += 1
        page_hash = hashlib.sha1((file_name_hash + str(page_number)).encode("UTF-8")).hexdigest()[:10] # generate page hash
        paragraphs = page.findall(xpath_ + "p") # Get all paragraphs 
        for p in paragraphs:
            p.set("page", str(page_number)) # Set page attribute
            p.set("file_name", file_name) # Set file_name 
            p.set("file_name_hash", file_name_hash) # Set file_name_hash
            p.set("page_hash", page_hash) # Set file_name_hash
            p.set("title", title) # Set title
            p.set("book_lang", book_lang) # Set lang
            p.set("book_type", book_type) # Set type
            p.set("author", author) # Set type
            p.set("author-label", author_label) # Set type
            show_page = True if p.text and len(p.text.split()) >= min_number_of_tokens and not re.match('(\s+)?\d', p.text) else False
            p.set("skip", "false" if page_number > pages_to_skip and show_page else "true") # Skip pages 
    else:
        books[file_name_hash]["pages"] = page_number
        books[file_name_hash]["file_name"] = file_name

    tree.write(f_xml) #Save modifications

    #print(f_xml)
    if books[file_name_hash]["lang"] == "fr" and \
            books[file_name_hash]["type"] == "primary_literature" and \
            books[file_name_hash]["author"] != "adam-smith":
        print(file_name_hash, str(books[file_name_hash]))

def get_files_xml(path_to_files):
    for dirpath, dirnames, filenames in os.walk(path_to_files):
        for fname in filenames:
            if fname[-4:] == ".xml":
                yield dirpath + "/" + fname

def main():
    logging.basicConfig(level=10) 
    try: 
        path_to_files = sys.argv[1] if len(sys.argv) > 1 else "."
        for f_xml in get_files_xml(path_to_files):
            normalizing_xml_from_tika(f_xml)
    except IndexError:
        logging.error("\nUsage: {} </path/to/xml/>".format(sys.argv[0]))
        exit(0)

if "__main__" == __name__:
    main()

