import { app } from './App';

const PORT = 3030;

app.all('*', (req, res) => {
  res.status(404);
  res.send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND',
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
