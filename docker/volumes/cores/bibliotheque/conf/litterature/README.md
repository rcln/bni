# Preparing documents.
## Converting PDFs to XML with Tika 
### Downloading tika

Download [tika-app](https://tika.apache.org/download.html), for example:

```
$ mkdir tika
$ cd tika 
$ wget http://mirrors.ircam.fr/pub/apache/tika/tika-app-1.16.jar
``` 

### Using tika

Convert PDFs in a path with the following command.

```
$ java -jar tika-app-1.16.jar -i input/path/to/files -o output/path/to/files -x 
```

