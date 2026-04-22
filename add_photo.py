import json
import shutil

earth_details_file = "C:\\Users\\sahir\\website\\sahirv.github.io\\sv_ng\\sv_ng\\src\\data\\earth.json"
astro_details_file = "C:\\Users\\sahir\\website\\sahirv.github.io\\sv_ng\\sv_ng\\src\\data\\astro.json"
earth_images_path = "C:\\Users\\sahir\\website\\sahirv.github.io\\sv_ng\\sv_ng\\src\\images\\earth"
astro_images_path = "C:\\Users\\sahir\\website\\sahirv.github.io\\sv_ng\\sv_ng\\src\\images\\astro"


# Gather input and create dictionary.
image = {}
image_path = input("full file path: ")
image_path_split = image_path.split("\\")
image["image"] = image_path_split[len(image_path_split) - 1]
image["title"] = input("title: ")
image["description"] = input("description: ")
is_astro = input("Is Astro (t/f): ") == "t"
if is_astro:
    equipment = input("equipment (comma separated): ")
    image["equipment"] = equipment.split(",")
    image["link"] = input("link: ")
    image["id"] = input("id: ")
else:
    image["continent"] = input("continent: ")
    image["location"] = input("location: ")
    tags = input("tags (comma separated): ")
    image["tags"] = tags.split(",")

# Write new image detail to json file.
details_file = open(astro_details_file) if is_astro else open(earth_details_file)
details = json.loads(details_file.read())
if is_astro:
    details["astro_image_details"].insert(0, image)
else:
    details["earth_image_details"].insert(0, image)

details_file.close()

details_file = open(astro_details_file, "w") if is_astro else open(earth_details_file, "w")
details_file.write(json.dumps(details,indent=4))

# Copy image file to website directory.
if is_astro:
    shutil.copy2(image_path, astro_images_path)
else:
    shutil.copy2(image_path, earth_images_path)



