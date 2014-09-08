sudo service runmapserv.sh start
uwsgi_python27 --socket 127.0.0.1:3031 --file /home/diver/geoserver/application.py --chdir /home/diver/geoserver -p 2 --threads 5 -b 8192
