import logging 
import sys
import re
import os
import lxml.etree as etree 
from os import path
from functools import reduce
import hashlib

books = { 
        '0aa143883f': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'en', 'type': 'primary_literature'},
        '2b76d54304': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'en', 'type': 'primary_literature'},
        '4b901623e0': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'en', 'type': 'primary_literature'},
        '085e52c595': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        'e9b420c553': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        'c69b7fa1b9': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        '7bdb388b0a': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        'df5bd1cdc4': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        'cbb1c9443e': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        '396def3367': {'author': 'adam-smith', 'author-label': 'Adam Smith', 'lang': 'fr', 'type': 'primary_literature'},
        #francis-hutcheson
        'c3d66c622a': {'author': 'francis-hutcheson', 'author-label': 'Francis Hutcheson', 'lang': 'fr', 'type': 'primary_literature'},
        'd6d7f2ab5d': {'author': 'francis-hutcheson', 'author-label': 'Francis Hutcheson', 'lang': 'fr', 'type': 'primary_literature'},
        'e75f25bae0': {'author': 'francis-hutcheson', 'author-label': 'Francis Hutcheson', 'lang': 'fr', 'type': 'primary_literature'},
        '53368b4a2d': {'author': 'francis-hutcheson', 'author-label': 'Francis Hutcheson', 'lang': 'fr', 'type': 'primary_literature'}
    }


def set_books_metadata():
    global books 
    books['0aa143883f']['title'] = 'The Theory of Moral Sentiments'.capitalize()
    books['2b76d54304']['title'] = 'An Inquiry Into the Nature and Causes of The Wealth Of Nations'.capitalize()
    books['4b901623e0']['title'] = 'LECTURES ON JURISPRUDENCE'.capitalize()
    books['7bdb388b0a']['title'] = 'RECHERCHES SUR LA NATURE ET LES CAUSES DE LA RICHESSE DES NATIONS 1'.capitalize()
    books['7bdb388b0a']['skip'] = 14
    books['085e52c595']['title'] = 'RECHERCHES SUR LA NATURE ET LES CAUSES DE LA RICHESSE DES NATIONS 2'.capitalize()
    books['085e52c595']['skip'] = 7
    books['e9b420c553']['title'] = 'RECHERCHES SUR LA NATURE ET LES CAUSES DE LA RICHESSE DES NATIONS 3'.capitalize()
    books['e9b420c553']['skip'] = 7
    books['c69b7fa1b9']['title'] = 'RECHERCHES SUR LA NATURE ET LES CAUSES DE LA RICHESSE DES NATIONS 4'.capitalize()
    books['c69b7fa1b9']['skip'] = 8
    books['cbb1c9443e']['title'] = 'RECHERCHES SUR LA NATURE ET LES CAUSES DE LA RICHESSE DES NATIONS 5'.capitalize()
    books['cbb1c9443e']['skip'] = 8
    books['df5bd1cdc4']['title'] = 'Leçons sur la jurisprudence'
    books['df5bd1cdc4']['skip'] = 32
    books['396def3367']['title'] = 'Théorie des sentiments moraux'
    books['396def3367']['skip'] = 26

def normalizing_xml_from_tika(f_xml):
    tree = etree.parse(f_xml)
    root = tree.getroot()
    namespace = tree.xpath('namespace-uri(.)')
    xpath_ = "{" + namespace + "}"
    head = tree.find("//" + xpath_ + "head")
    body = tree.find("//" + xpath_ + "body")
    pages = body.findall(xpath_ + "div[@class='page']") # One div represents a page in Tika format

    page_number = 0 # Page counter
    min_number_of_tokens = 18
    file_name = path.basename(f_xml).replace(".pdf.xml","") # Get file_name
    file_name_hash = hashlib.sha1(file_name.encode("UTF-8")).hexdigest()[:10] # generate hash

    books.setdefault(file_name_hash, {})
    if not books[file_name_hash]:
        logging.debug(file_name_hash + ":" + f_xml)

    set_books_metadata() #get books's metadata
    title = books[file_name_hash]["title"] if "title" in books[file_name_hash] else "file_name: " + file_name #set title
    pages_to_skip = books[file_name_hash]["skip"] if "skip" in books[file_name_hash] else 20 # pages to skip
    book_lang = books[file_name_hash]["lang"] if "lang" in books[file_name_hash] else "None" #set title
    book_type = books[file_name_hash]["type"] if "type" in books[file_name_hash] else "None" #set title
    author = books[file_name_hash]["author"] if "author" in books[file_name_hash] else "None"  #set title
    author_label = books[file_name_hash]["author-label"] if "author-label" in books[file_name_hash] else "None" #set title
    
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
            show_page = True if p.text and len(p.text.split()) >= min_number_of_tokens else False
            p.set("skip", "false" if page_number > pages_to_skip and show_page else "true") # Skip pages 
    else:
        books[file_name_hash]["pages"] = page_number
        books[file_name_hash]["file_name"] = file_name

    tree.write(f_xml) #Save modifications

    logging.debug("'{1}': {{'pages':{0:>5}, 'file_name': '{2}'}},".format(page_number, file_name_hash, file_name))

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

