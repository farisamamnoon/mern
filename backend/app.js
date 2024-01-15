const express = import('express');
const bodyParser = import('body-parser');

const placeRroute = import('./routes/place-routes')


const app = express();

app.use('/api/places' ,placeRroute);

app.listen(8080);