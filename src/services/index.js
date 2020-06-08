const Api = require("../utils/Api");

let {
  blogService,
  guideService,
  categoryService,
  tagsService,
  userService,
  childrenService,
  get_service,
  galleryService,
  CategoriesService
} = Api;

export const getBlogs = params =>
  blogService.find({
    query: params
  });

export const blogUpdate = (id, url) =>
  blogService.patch(id, { cover_picture: url });

export const saveBlog = (params) =>
  blogService.create(params);

export const saveGuide = (params) =>
  guideService.create(params);

export const guideUpdate = (id, url) =>
  guideService.patch(id, { cover_picture: url });

export const getCategories = (query = {}) => categoryService.find(query);
export const categoyUpdateUrl = (id, url) =>
  categoryService.patch(id, { image: url });

export const categoyUpdate = (id, params) => categoryService.patch(id, params);

export const getTags = () => tagsService.find({});
export const get_users = (params = {}) => userService.find(params);
export const get_childrens = () => childrenService.find({
  query: {
    $limit: 1000000
  }
});
export const getService = (servie) => get_service(servie);
/* Categories */
export const get_categories = (id) => CategoriesService.get(id);
export const update_category = (id, payloads) => CategoriesService.patch(id, payloads);
/* Galleries */
export const get_gallery = (id) => galleryService.get(id);
export const createGallery = ({
  meta_file_name,
  name,
  meta_size,
  meta_media_type,
  file_type,
  path,
  description,
  service_type
}) =>
  galleryService.create({
    meta_file_name,
    name,
    meta_size,
    meta_media_type,
    file_type,
    path,
    description,
    service_type
  });
