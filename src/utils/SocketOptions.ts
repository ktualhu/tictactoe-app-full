export const options = {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

export const port = process.env.PORT || 5001;
