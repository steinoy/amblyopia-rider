let stereoBeatMaterials;

AFRAME.registerComponent("stereo-beat", {
  settings: {
    red: 0.1,
    blue: 0.9,
  },

  init() {
    this.el.addEventListener("loaded", () => {
      // replace the original mesh with new ones, one for each eye
      this.leftMesh = this.el.children[0].object3D.children[0].clone();
      this.rightMesh = this.el.children[0].object3D.children[0].clone();
      this.el.children[0].object3D.add(this.leftMesh);
      this.el.children[0].object3D.add(this.rightMesh);

      // hide original
      this.el.children[0].object3D.children[0].visible = false;

      // left VR camera is by default enabled for layer 0 and 1,
      // right camera for layer 0 and 2

      // cameras can only see objects that share at least one common layer with the camera
      // show the left mesh to the left camera only (layer 1)
      this.leftMesh.layers.set(1);

      // show the right mesh to the right camera only (layer 2)
      this.rightMesh.layers.set(2);

      if (!stereoBeatMaterials) {
        this.makeMaterials();
      }

      this.leftMesh.material =
        this.el.getAttribute("beat").color == "red"
          ? stereoBeatMaterials.left.red
          : stereoBeatMaterials.left.blue;

      this.rightMesh.material =
        this.el.getAttribute("beat").color == "red"
          ? stereoBeatMaterials.right.red
          : stereoBeatMaterials.right.blue;
    });
  },

  makeMaterials() {
    stereoBeatMaterials = {
      left: {
        red: this.el.sceneEl.systems.materials.beat.clone(),
        blue: this.el.sceneEl.systems.materials.beat.clone(),
      },
      right: {
        red: this.el.sceneEl.systems.materials.beat.clone(),
        blue: this.el.sceneEl.systems.materials.beat.clone(),
      },
    };

    this.updateMaterials();
  },

  updateMaterials() {
    stereoBeatMaterials.left.red.opacity =
      this.settings.red <= 0.5 ? 1 : 1 - (this.settings.red - 0.5) * 2;
    stereoBeatMaterials.left.blue.opacity =
      this.settings.blue <= 0.5 ? 1 : 1 - (this.settings.blue - 0.5) * 2;
    stereoBeatMaterials.right.red.opacity =
      this.settings.red <= 0.5 ? this.settings.red * 2 : 1;
    stereoBeatMaterials.right.blue.opacity =
      this.settings.blue <= 0.5 ? this.settings.blue * 2 : 1;
  },
});
