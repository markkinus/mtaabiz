import { useState } from "react";

function BusinessOwnerDashboard() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("Beauty & Grooming");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [services, setServices] = useState([{ name: "", price: "" }]);

  function handleServiceChange(index, field, value) {
    const updatedServices = [...services];

    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };

    setServices(updatedServices);
  }

  function addService() {
    setServices([...services, { name: "", price: "" }]);
  }

  function removeService(index) {
    setServices(services.filter((_, serviceIndex) => serviceIndex !== index));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      businessName,
      category,
      location,
      description,
      services,
    });

    alert("Form works!.");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Business Owner Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          Add your business and the services you offer.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block font-medium">Business name</label>
            <input
              className="w-full rounded-lg border p-3"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="e.g. Fresh Cuts Barbershop"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Category</label>
            <select
              className="w-full rounded-lg border p-3"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option>Beauty & Grooming</option>
              <option>Automotive</option>
              <option>Home Services</option>
              <option>Photography</option>
              <option>Electronics Repair</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Business location</label>
            <input
              className="w-full rounded-lg border p-3"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Kasarani, Nairobi"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Business description
            </label>
            <textarea
              className="w-full rounded-lg border p-3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell customers about your business..."
              required
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Services and prices</h2>

              <button
                type="button"
                onClick={addService}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
              >
                Add service
              </button>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-2"
                >
                  <input
                    className="rounded-lg border p-3"
                    placeholder="Service name"
                    value={service.name}
                    onChange={(event) =>
                      handleServiceChange(index, "name", event.target.value)
                    }
                    required
                  />

                  <div className="flex gap-2">
                    <input
                      className="min-w-0 flex-1 rounded-lg border p-3"
                      type="number"
                      placeholder="Price (KES)"
                      value={service.price}
                      onChange={(event) =>
                        handleServiceChange(index, "price", event.target.value)
                      }
                      required
                    />

                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="rounded-lg px-3 text-red-600 hover:bg-red-50"
                        aria-label={`Remove service ${index + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Preview business details
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessOwnerDashboard;
