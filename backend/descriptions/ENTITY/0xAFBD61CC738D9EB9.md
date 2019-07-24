rotationOrder refers to the order yaw pitch roll is applied
value ranges from 0 to 5. What you use for rotationOrder when getting must be the same as rotationOrder when setting the rotation. 
Unsure what value corresponds to what rotation order, more testing will be needed for that.
------
rotationOrder is usually 2 in scripts
------
ENTITY::GET_ENTITY_ROTATION(Any p0, false or true);
if false than return from -180 to 180
if true than return from -90 to 90

---

As said above, the value of p1 affects the outcome. R* uses 1 and 2 instead of 0 and 1, so I marked it as an int.

What it returns is the yaw on the z part of the vector, which makes sense considering R* considers z as vertical. Here's a picture for those of you who don't understand pitch, yaw, and roll:

www.allstar.fiu.edu/aero/images/pic5-1.gif

I don't know why it returns a Vec3, but sometimes the values x and y go negative, yet they're always zero. Just use GET_ENTITY_PITCH and GET_ENTITY_ROLL for pitch and roll.