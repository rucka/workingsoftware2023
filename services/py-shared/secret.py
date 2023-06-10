import os
 
realtive_file_path = "../SECRET"
 
file_path = os.path.join(os.path.dirname(__file__), realtive_file_path)

def readSecret():
    if os.path.isfile(file_path):
        text_file = open(file_path, "r")
        data = text_file.read()
        text_file.close()
    
        return data