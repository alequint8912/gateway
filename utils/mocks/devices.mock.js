const deviceMocks = [
  {
    _id: "63865bde2b35faa03231716b",
    vendor: "vendor",
    createdDate: "2022-12-12T05:00:00.000Z",
    status: "offline",
    __v: 0,
  },
  {
    _id: "638dfa07dda50dfacb168618",
    vendor: "vendor1",
    status: "online",
    __v: 0,
  },
  {
    _id: "638dfa5f511caf26079c3e0d",
    vendor: "vendor2",
    createdDate: "2022-12-02T00:00:00.000Z",
    status: "offline",
    __v: 0,
  },
  {
    _id: "638dfa6f511caf26079c3e0f",
    vendor: "vendor3",
    createdDate: "2022-12-03T00:00:00.000Z",
    status: "offline",
    __v: 0,
  },
  {
    _id: "638dfa7a511caf26079c3e11",
    vendor: "vendor4",
    createdDate: "2022-12-04T00:00:00.000Z",
    status: "online",
    __v: 0,
  },
  {
    _id: "638e01ad038ed6f23c82e27e",
    vendor: "vendor5",
    createdDate: "2022-12-12T00:00:00.000Z",
    status: "online",
    __v: 0,
  },
];

const find = () => {
  return deviceMocks;
};

const findById = (id) => {
  const device = deviceMocks.find((elem) => elem._id === id);
  return device;
};

module.exports = {
  deviceMocks,
  find,
  findById,
};
