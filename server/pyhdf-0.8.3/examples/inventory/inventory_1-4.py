from pyhdf.HDF import *
from pyhdf.VS import *

f = HDF('inventory.hdf')         # open 'inventory.hdf' in read mode
vs = f.vstart()                  # init vdata interface
vd = vs.attach('INVENTORY')      # attach vdata 'INVENTORY' in read mode

# Display some vdata attributes
print "status:", vd.status
print "vdata: ", vd._name        # predefined attribute: vdata name
print "nrecs: ", vd._nrecs       # predefined attribute:  num records
    
# Display value of attribute 'unit' for all fields on which
# this attribute is set
print "units: ",
for fieldName in vd._fields:     # loop over all field names
    try:
        # instantiate field and obtain value of attribute 'unit'
        v = vd.field(fieldName).unit    
        print "%s: %s" % (fieldName, v),
    except:                      # no 'unit' attribute: ignore 
        pass
print ""
print ""

# Display table header.
header = "%-7s %-12s %3s %4s %8s" % tuple(vd._fields)
print "-" * len(header)
print header
print "-" * len(header)

# Loop over the vdata records, displaying each record as a table row.
# Current record position is 0 after attaching the vdata.
while 1:
    try:
	rec = vd.read()          # read next record
	# equivalent to:
     #  rec = vd[vd.tell()]
        print "%-7s %-12s %3d %4.1f %8.2f" % tuple(rec[0])
    except HDF4Error:             # end of vdata reached
        break

vd.detach()               # "close" the vdata
vs.end()                  # terminate the vdata interface
f.close()                 # close the HDF file
