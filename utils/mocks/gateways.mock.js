const gatewaysMocks = [
  {
    _id: "63864eb29e9a8fc12a450a7e",
    name: "gateway 1",
    address: "192.168.70.3",
    devices: [],
    __v: 0,
  },
  {
    _id: "638779f0e3ed08ef300d50ba",
    name: "gateway 2",
    address: "192.168.70.4",
    devices: [],
    __v: 0,
  },
  {
    _id: "638779f9e3ed08ef300d50bc",
    name: "gateway 3",
    address: "192.168.70.5",
    devices: [],
    __v: 0,
  },
  {
    _id: "63877a1ee3ed08ef300d50bf",
    name: "gateway 4",
    address: "192.168.70.6",
    devices: [],
    __v: 0,
  },
  {
    _id: "63877a26e3ed08ef300d50c1",
    name: "gateway 5",
    address: "192.168.70.7",
    devices: [],
    __v: 0,
  },
];

const find = () => {
  return gatewaysMocks;
};

const findById = (id) => {
  const gateway = gatewaysMocks.find((elem) => elem._id === id);
  return gateway;
};

module.exports = {
  gatewaysMocks,
  find,
  findById,
};
