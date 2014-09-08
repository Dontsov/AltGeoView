#!/usr/bin/env python
# -*- coding: utf-8 -*-
from operator import itemgetter, attrgetter
import glob, os, sys


class ClearnTrash():
    '''
    класс работы со старыми данными
    '''
   
    def sort_files_by_last_modified(self):         #вывод отсортированых по дате изменения файлов
#         fileData = {}
#         for fname in files:
#             fileData[fname] = os.stat(fname).st_mtime
#         fileData = sorted(fileData.items(), key = itemgetter(1))
#         return fileData

          fill = '/home/diver/'
          all_sub_files = glob.glob(fill+'/*.*')
          file_time_dict={file_name:os.path.getmtime(file_name) for file_name in all_sub_files}
          max_time_result= max(file_time_dict, key=lambda x: file_time_dict.values())

          print max_time_result, file_time_dict[max_time_result]


    def delete_oldest_files(self, sorted_files, keep = 3):      #выводит список файлов по маске, оставляя 3 самых новых
        delete = len(sorted_files) - keep
        for x in range(0, delete):
            print "Удаляю: " + sorted_files[x][0]
            os.remove(sorted_files[x][0])


oldFiles = ClearnTrash()
oldFiles.sort_files_by_last_modified()

