const Style = require("../models/Style");
const Product = require("../models/Product");
const Container = require("../models/Container");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function index(req, res) {
  const styles = await Style.find().populate("containers");

  return res.json(styles);
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const containers = await Container.find();
    const container = [];
    if (fields.can === "on") {
      const can = containers.filter((type) => type.name === "can");
      container.push(...can);
    }
    if (fields.bottle === "on") {
      const bottle = containers.filter((type) => type.name === "bottle");
      container.push(...bottle);
    }
    if (fields.keg === "on") {
      const keg = containers.filter((type) => type.name === "keg");
      container.push(...keg);
    }

    const style = await Style.create({
      name: fields.name,
      description: fields.description,
      price: fields.price,
      abv: fields.abv,
      containers: container,
      photos: [],
    });

    if (files.photos !== undefined) {
      if (Array.isArray(files.photos)) {
        for (const photo of files.photos) {
          style.photos.push(photo.originalFilename);
          const photoData = fs.readFileSync(photo.filepath);
          const { data, error } = await supabase.storage
            .from("unicorn-beer-bucket")
            .upload(photo.originalFilename, photoData, {
              cacheControl: "3600",
              upsert: false,
              contentType: photo.mimetype,
            });
      
        }
        style.save();
      } else {
        style.photos.push(files.photos.originalFilename);
        const photoData = fs.readFileSync(files.photos.filepath);
        const { data, error } = await supabase.storage
          .from("unicorn-beer-bucket")
          .upload(files.photos.originalFilename, photoData, {
            cacheControl: "3600",
            upsert: false,
            contentType: files.photos.mimetype,
          });

        style.save();
      }
    }

    style
      ? res.status(201).json(style)
      : res.status(409).send({ message: "Something went wrong, try again later" });
  });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      return `${part.originalFilename}`;
    },
  });

  form.parse(req, async (err, fields, files) => {
    const style = await Style.findById(req.params.id);
    const newStyle = {
      name: fields.name,
      description: fields.description,
      price: fields.price,
      photos: [],
      abv: fields.abv,
    };

    if (Array.isArray(style.photos)) {
      newStyle.photos.push(...style.photos);
    }
    console.log(files.photos);
    if (files.photos !== undefined) {
      if (Array.isArray(files.photos)) {
        for (const photo of files.photos) {
          newStyle.photos.push(photo.originalFilename);
          const photoData = fs.readFileSync(photo.filepath);
          const { data, error } = await supabase.storage
            .from("unicorn-beer-bucket")
            .upload(photo.originalFilename, photoData, {
              cacheControl: "3600",
              upsert: false,
              contentType: files.photos.mimetype,
            });
        }
      } else {
        const photoData = fs.readFileSync(files.photos.filepath);
        const { data, error } = await supabase.storage
          .from("unicorn-beer-bucket")
          .upload(files.photos.originalFilename, photoData, {
            cacheControl: "3600",
            upsert: false,
            contentType: files.photos.mimetype,
          });
        newStyle.photos.push(files.photos.originalFilename);
      }
    }

    const updatedStyle = await Style.findByIdAndUpdate(req.params.id, newStyle, { new: true });

    return res.status(202).json(updatedStyle);
  });
}

async function destroy(req, res) {
  const style = await Style.findByIdAndDelete(req.body.styleId);
  const products = await Product.find({ style: style._id });
  for (const product of products) {
    await Product.findByIdAndDelete(product._id);
  }

  return res.status(200).send({ message: "Style and its products deleted" });
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
