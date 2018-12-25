import Augmentor

p = Augmentor.Pipeline("./binImages/")

p.flip_left_right(probability=0.50)
p.flip_top_bottom(probability=0.01)
p.random_distortion(probability=0.95, grid_width=4, grid_height=4, magnitude=8)
p.skew_tilt(probability=0.1)
p.skew_corner(probability=0.5)
p.crop_random(probability=0.2, percentage_area=0.9)
p.resize(probability=1.0, width=56, height=56)

p.sample(5000)