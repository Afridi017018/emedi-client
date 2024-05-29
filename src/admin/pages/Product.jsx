import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { getAllCategories } from "../../apiCalls/category";
import {
  addService,
  deleteService,
  getAllServices,
  updateService,
} from "../../apiCalls/services";
import Loading from "../../pages/Loading/Loading";

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getServices = async () => {
    setIsLoading(true);
    const data = await getAllServices();
    setServices(data.services);
    setIsLoading(false);
  };

  const getCategories = async () => {
    setIsLoading(true);
    const data = await getAllCategories();

    setCategories(data.categories);
    setIsLoading(false);
  };

  useEffect(() => {
    getServices();
    getCategories();
  }, []);

  const [editedService, setEditedService] = useState(null);
  const [inputState, setInputState] = useState({});
  const [isPrescriptionChecked, setIsPrescriptionChecked] = useState(false);

  const serviceSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    // setIsLoading(true);
    const result = await addService(formData);
    // setIsLoading(false)

    getServices();

    const title = form.title.value;
    const category = form.category.value;
    const price = form.price.value;
    const description = form.description.value;
    const duration = form.duration.value;

    const newService = {
      id: services.length + 1,
      title,
      category,
      price,
      description,
      duration,
    };

    const addedService = [...services, newService];

    setServices(addedService);
    // form.reset();
  };

  const handleDelete = async (id) => {
    const data = await deleteService(id);
    getServices();
  };

  const editbuttonHander = (id) => {
    setEditedService(id);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const saveService = async (id) => {
    const editedService = services.filter((service) => service._id === id);

    const updatedService = {
      id: editedService[0]._id,
      title: inputState.title || editedService[0].title,
      category: inputState.category || editedService[0].category._id,
      description: inputState.description || editedService[0].description,
      duration: inputState.duration || editedService[0].duration,
      price: inputState.price || editedService[0].price,
    };

    const data = await updateService(updatedService);
    getServices();

    setEditedService(null);
    setInputState({});
  };

  const handleSearch = () => {
    if (searchTerm) {
      const filteredServices = services.filter((service) =>
        service._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setServices(filteredServices);
    } else {
      getServices();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="mb-4">
        <strong className="text-gray-700 font-medium mb-2">
          Insert Service
        </strong>
        <div className="bg-gray-100 p-4 rounded-sm flex flex-col items-start">
          <form onSubmit={serviceSubmit}>
            <div className="lg:flex">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />

              <select
                name="category"
                defaultValue=""
                // onChange={inputHandler}
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {" "}
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
              </select>

              <select
                name="company"
                defaultValue=""
                // onChange={inputHandler}
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                required
              >
                <option value="" disabled>
                  Select Company
                </option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {" "}
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:flex">
              <input
                type="number"
                name="b2bSellingPrice"
                placeholder="B2B Selling Price"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />

              <input
                type="number"
                name="b2bDiscount"
                placeholder="B2B Discount"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />
            </div>

            <div className="lg:flex">
              <input
                type="number"
                name="b2cSellingPrice"
                placeholder="B2C Selling Price"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />

              <input
                type="number"
                name="b2cDiscount"
                placeholder="B2C Discount"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
                step="0.01"
              />
            </div>

            <div className="lg:flex">
              <input
                type="text"
                name="disclaimer"
                placeholder="Disclaimer"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />

              <input
                type="number"
                name="qtyInStock"
                placeholder="Stock"
                required
                className="w-1/2 border border-gray-400 m-5 p-2 mb-2"
              />
            </div>

            <div className="lg:flex items-center">
              <div className="flex flex-col justify-center w-1/2 m-5 mb-2 ">
                <label htmlFor="image" className="mb-1 text-gray-700 font-bold">
                  Add Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  className="border border-gray-400 p-2"
                  required
                />
              </div>

              <div className="m-5 p-2 mb-2 flex items-center gap-2 mt-10">
                <input
                  type="checkbox"
                  checked={isPrescriptionChecked}
                  onChange={() =>
                    setIsPrescriptionChecked(!isPrescriptionChecked)
                  }
                  className="checkbox border border-black"
                />
                <label>Prescription</label>
              </div>
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded m-5"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-700 font-medium">View Services</strong>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Here ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border mr-2 px-3 py-1 rounded w-[14rem]"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search
          </button>
        </div>
      </div>
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto sticky top-0 h-[95vh]">
        <table className="w-full text-gray-700 text-xs">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Category</th>
              <th></th>
              <th>Duration</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service._id}</td>
                <td>
                  {editedService === service._id ? (
                    <input
                      type="text"
                      name="title"
                      defaultValue={service.title}
                      onChange={inputHandler}
                    />
                  ) : (
                    service.title
                  )}
                </td>
                <td>
                  {editedService === service._id ? (
                    <select
                      name="category"
                      defaultValue={service.category._id}
                      onChange={inputHandler}
                      className="w-32 border rounded p-2"
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>

                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {" "}
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="capitalize">{service.category.name}</div>
                  )}
                </td>
                <td>
                  {editedService === service._id && (
                    <input
                      type="text"
                      name="description"
                      defaultValue={service.description}
                      onChange={inputHandler}
                    />
                  )}
                </td>
                <td>
                  {editedService === service._id ? (
                    <input
                      type="text"
                      name="duration"
                      defaultValue={service.duration}
                      onChange={inputHandler}
                    />
                  ) : (
                    service.duration
                  )}
                </td>
                <td>
                  {editedService === service._id ? (
                    <input
                      type="number"
                      name="price"
                      defaultValue={service.price}
                      onChange={inputHandler}
                    />
                  ) : (
                    service.price
                  )}
                </td>
                <td>
                  {editedService === service._id ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded font-bold mr-1"
                      onClick={() => saveService(service._id)}
                    >
                      <RxUpdate />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                      onClick={() => editbuttonHander(service._id)}
                    >
                      <AiFillEdit />
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(service._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
