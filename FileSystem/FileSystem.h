#ifndef FILESYSTEM_FILESYSTEM_H
#define FILESYSTEM_FILESYSTEM_H

#include <iostream>
#include "Folder.h"
#include "Consola.h"

using namespace std;

class FileSystem {

public:
    FileSystem();

    string id;
    Folder* root = new Folder();


    void createFile(string path, int size, string cont, string p);
    void makeDirectory(string path, string p);

    bool existFolderPath(string path, vector<Folder*> folders);



    string getPath(string pathFile);
    string getName(string pathFile);
};

FileSystem::FileSystem() {
    this->root->name = "/";
}

void FileSystem::makeDirectory(string path, string p) {
    if (p == "" || p == " ") {
        size_t lastIndex = path.find_last_of("/");
        size_t index = path.substr(0, lastIndex).find_last_of("/");
        string FatherPath = path.substr(0, index + 1);

        if (!existFolderPath(FatherPath, root->folders)) {
            cout << " *** Error, no se puede crear la carpeta, ya que no existen los directorios " << FatherPath << endl << endl;
            return;
        } else {
            cout << "@p se puede crear la carpeta, existen los padres" << endl;
        }
    }

    // Crear todos los directorios de la ruta
    vector<Folder*> folders = {root};
    string auxPath = path;
    while(true) {
        size_t indexInit = auxPath.find('/');
        size_t indexEnd = auxPath.substr(indexInit + 1).find('/');

        if (indexEnd == string::npos) {
            break;
        }

        string currentFolder = auxPath.substr(indexInit + 1, indexEnd);
        string restPath = auxPath.substr(indexEnd + 1);

        Folder* folder = folders.at(0);
        folders.erase(folders.begin());

        folder->createFolder(currentFolder);

        Folder* gf = folder->getFolder(currentFolder);
        folders.push_back(gf);

        auxPath = restPath;
    }

}


bool FileSystem::existFolderPath(string path, vector<Folder*> folders) {

    size_t indexInit = path.find('/');
    size_t indexEnd = path.substr(indexInit + 1).find('/');

    if (indexEnd == string::npos) {
        return true;
    }

    string currentFolder = path.substr(indexInit + 1, indexEnd);
    string restPath = path.substr(indexEnd + 1);

    //cout << "Current Folder: " << currentFolder << endl;

    for (Folder* folder: folders) {
        if (folder->name == currentFolder) {
            //cout << " Existe el folder " << currentFolder << endl;
            return existFolderPath(restPath, folder->folders) && true;
        }
    }

    return false;
}


void FileSystem::createFile(string path, int size, string cont, string p) {

    // Obtener ruta y nombre
    string pathFile = getPath(path);
    string nameFile = getName(path);

    // Si el path es la raiz
    if (pathFile == "/") {
        root->createFile(nameFile, size, cont);
        cout << endl << "El archivo " << nameFile << " se creo en " << pathFile << endl << endl;
        return;
    }


    // Validar el parametro P
    if (p == "" || p == " ") {

        if (!existFolderPath(pathFile, root->folders)) {
            cout << " *** Error, no se puede crear el archivo, ya que no existen los directorios " << pathFile << endl << endl;
            return;
        } else {
            cout << "@p se puede crear el archivo, existen los padres" << endl;
        }
    }

    // Crear todos los directorios
    makeDirectory(pathFile, "p");

    // Crear el archivo en el ultimo directorio
    // Crear todos los directorios de la ruta
    vector<Folder*> folders = {root};
    string auxPath = pathFile;
    while(true) {
        size_t indexInit = auxPath.find('/');
        size_t indexEnd = auxPath.substr(indexInit + 1).find('/');

        if (indexEnd == string::npos) {
            Folder* folder = folders.at(0);
            folder->createFile(nameFile, size, cont);

            break;
        }

        string currentFolder = auxPath.substr(indexInit + 1, indexEnd);
        string restPath = auxPath.substr(indexEnd + 1);

        Folder* folder = folders.at(0);
        folders.erase(folders.begin());

        Folder* gf = folder->getFolder(currentFolder);
        folders.push_back(gf);

        auxPath = restPath;
    }

}

string FileSystem::getPath(string pathFile) {
    char c;
    size_t lastIndex = 0;
    int length = pathFile.length();

    for (int i = length - 1; i >= 0; i--) {
        c = pathFile[i];
        if (c == '/') {
            lastIndex = i;
            break;
        }
    }

    string path = pathFile.substr(0,lastIndex + 1);

    return path;
}

string FileSystem::getName(string pathFile)  {
    char c;
    size_t lastIndex = 0;
    int length = pathFile.length();

    for (int i = length - 1; i >= 0; i--) {
        c = pathFile[i];
        if (c == '/') {
            lastIndex = i;
            break;
        }
    }

    string name = pathFile.substr(lastIndex + 1);

    return name;
}

#endif //FILESYSTEM_FILESYSTEM_H
