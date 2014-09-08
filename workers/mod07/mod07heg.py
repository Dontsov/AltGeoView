#!/usr/bin/env python
# -*- coding: utf-8 -*-

import subprocess

import os
import sys
basedir = "/home/diver/geolocal/datahdf/"
sys.path.append('')


# filter(lambda i: '.hdf' in i , os.listdir(basedir)) пригодится потом
#print filter(lambda i: '.hdf' in i and 'MOD07' in i , os.listdir(basedir))


def mod07heg(cmd):
    PIPE = subprocess.PIPE
    subprocess.Popen(cmd, shell = True)
    subprocess.Popen('echo $PATH', shell = True)
    #return subprocess.Popen(cmd, shell = True)

cmd = r'/home/diver/heg/bin/resample  -p /home/diver/geoserver/fileparams/mod07.prm'
mod07heg(cmd)








