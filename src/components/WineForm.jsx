import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Row,
} from "reactstrap";
import instructions from "../assets/images/awards-example.png";

const wineObj = {
  name: "",
  image_url: "",
  status: "",
  description_es: "",
  description_en: "",
  grape_varietal_es: "",
  origin_country_es: "",
  food_pairing_es: "",
  awards_es: "",
  grape_varietal_en: "",
  origin_country_en: "",
  food_pairing_en: "",
  awards_en: "",
  award_image: "",
  bottle_price_es: "",
  box_price_es: "",
  bottle_price_en: "",
  box_price_en: "",
  datasheet_es: "",
  datasheet_en: "",
  sold_out: false,
};

const WineForm = ({ dispatch, done, item, waiting }) => {
  const [wine, setWine] = React.useState(wineObj);

  React.useEffect(() => {
    if (item) setWine(item);
    else setWine(wineObj);
  }, [item]);

  React.useEffect(() => {
    if (done) setWine(wineObj);
  }, [done]);

  function handleChange(e) {
    const { name, value } = e.target;
    setWine({ ...wine, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: item ? "update" : "add",
      payload: wine,
    });
  }

  const deleteWine = () => {
    if (window.confirm("This action will delete this wine, continue?"))
      dispatch({
        type: "delete",
        payload: item.id,
      });
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between flex-wrap align-items-center">
          <h2>{item ? item.name : "New Wine"}</h2>
          {waiting && <h2 className="text-primary">Please wait...</h2>}
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="name"
                  name="name"
                  value={wine.name || ""}
                  placeholder="wine name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="image_url">Wine Image</Label>
                <Input
                  onChange={handleChange}
                  id="image_url"
                  name="image_url"
                  value={wine.image_url || ""}
                  placeholder="url to wine image"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="status"
                  name="status"
                  value={wine.status || "draft"}
                  type="select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="sold_out">Sold Out</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="description_es">Description Spanish</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="description_es"
                  name="description_es"
                  value={wine.description_es || ""}
                  placeholder="wine description in spanish"
                  type="textarea"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="description_en">Description English</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="description_en"
                  name="description_en"
                  value={wine.description_en || ""}
                  placeholder="wine description in english"
                  type="textarea"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <h4 className="mb-4">Descriptive table</h4>
            <Col>
              <h5>Spanish</h5>
              <FormGroup row>
                <Label for="grape_varietal_es" sm={2}>
                  Grape Varietal
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    required
                    id="grape_varietal_es"
                    name="grape_varietal_es"
                    value={wine.grape_varietal_es || ""}
                    placeholder="grape varietal (spanish)"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="origin_country_es" sm={2}>
                  Origin Country
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    required
                    id="origin_country_es"
                    name="origin_country_es"
                    value={wine.origin_country_es || ""}
                    placeholder="country of origin (spanish)"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="food_pairing_es" sm={2}>
                  Food Pairing
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    required
                    id="food_pairing_es"
                    name="food_pairing_es"
                    value={wine.food_pairing_es || ""}
                    placeholder="food pairing (spanish)"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="awards_es" sm={2}>
                  Awards
                  <UncontrolledPopover
                    placement="top"
                    target="awards_es"
                    trigger="focus"
                    className="awards-popover"
                  >
                    <PopoverHeader className="text-danger">
                      Importante!!
                    </PopoverHeader>
                    <PopoverBody>
                      Este plugin es muy sensitivo, para mostrar correctamente
                      la informaci??n debe agregarla siguiendo este ejemplo:
                      <p>
                        <img
                          src={instructions}
                          alt="instructions"
                          style={{ width: "-webkit-fill-available" }}
                        />
                        <ol className="ms-0">
                          <li>
                            Premio: SILVER, GOLD, ORO O PLATA seg??n corresponda
                            (importante)
                          </li>
                          <li>
                            Exactamente este separador {"->"} | (importante)
                          </li>
                          <li>
                            A??os que correspondan, seguido de un ENTER
                            (importante)
                          </li>
                          <li>Separar cada premio por un ENTER (importante)</li>
                        </ol>
                      </p>
                    </PopoverBody>
                  </UncontrolledPopover>
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    id="awards_es"
                    name="awards_es"
                    value={wine.awards_es || ""}
                    placeholder="awards (spanish)"
                    type="textarea"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="award_image">
                  Award Image
                  <UncontrolledPopover
                    placement="right"
                    target="award_image"
                    trigger="focus"
                    className="awards-popover"
                  >
                    <PopoverHeader className="text-danger">
                      Important!!
                    </PopoverHeader>
                    <PopoverBody>
                      This plugin is very sensitive, if this field is{" "}
                      <strong>EMPTY</strong>, the awards info won't be shown in
                      the page.
                    </PopoverBody>
                  </UncontrolledPopover>
                </Label>
                <Input
                  onChange={handleChange}
                  id="award_image"
                  name="award_image"
                  value={wine.award_image || ""}
                  placeholder="url to medal image"
                />
              </FormGroup>
            </Col>
            <Col>
              <h5>English</h5>
              <FormGroup row>
                <Label for="grape_varietal_en" sm={2}>
                  Grape Varietal
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    required
                    id="grape_varietal_en"
                    name="grape_varietal_en"
                    value={wine.grape_varietal_en || ""}
                    placeholder="grape varietal (english)"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="origin_country_en" sm={2}>
                  Origin Country
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    required
                    id="origin_country_en"
                    name="origin_country_en"
                    value={wine.origin_country_en || ""}
                    placeholder="country of origin (english)"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="food_pairing_en" sm={2}>
                  Food Pairing
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    required
                    id="food_pairing_en"
                    name="food_pairing_en"
                    value={wine.food_pairing_en || ""}
                    placeholder="food pairing (english)"
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="awards_en" sm={2}>
                  Awards
                  <UncontrolledPopover
                    placement="top"
                    target="awards_en"
                    trigger="focus"
                    className="awards-popover"
                  >
                    <PopoverHeader className="text-danger">
                      Important!!
                    </PopoverHeader>
                    <PopoverBody>
                      This plugin is very sensitive, to show correctly the
                      information you must add it following this example
                      information correctly by following this example:
                      <p>
                        <img
                          src={instructions}
                          alt="instructions"
                          style={{ width: "-webkit-fill-available" }}
                        />
                        <ol className="ms-0">
                          <li>
                            Award: SILVER, GOLD, GOLD OR SILVER as applicable
                            (important)
                          </li>
                          <li>Exactly this separator {"->"} | (important)</li>
                          <li>
                            Years that apply, followed by an ENTER (important)
                          </li>
                          <li>Separate each award by an ENTER (important)</li>
                        </ol>
                      </p>
                    </PopoverBody>
                  </UncontrolledPopover>
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={handleChange}
                    id="awards_en"
                    name="awards_en"
                    value={wine.awards_en || ""}
                    placeholder="awards (english)"
                    type="textarea"
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="bottle_price_es">1-Bottle Price (MXN)</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="bottle_price_es"
                  name="bottle_price_es"
                  value={wine.bottle_price_es || ""}
                  placeholder="350.00"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="box_price_es">12-Box Price (MXN)</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="box_price_es"
                  name="box_price_es"
                  value={wine.box_price_es || ""}
                  placeholder="350.00"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="bottle_price_en">1-Bottle Price (USD)</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="bottle_price_en"
                  name="bottle_price_en"
                  value={wine.bottle_price_en || ""}
                  placeholder="19.99"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="box_price_en">12-Box Price (USD)</Label>
                <Input
                  onChange={handleChange}
                  required
                  id="box_price_en"
                  name="box_price_en"
                  value={wine.box_price_en || ""}
                  placeholder="19.99"
                  type="number"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="datasheet_es">Datasheet link (spanish)</Label>
                <Input
                  onChange={handleChange}
                  id="datasheet_es"
                  name="datasheet_es"
                  value={wine.datasheet_es || ""}
                  placeholder="url to file"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="datasheet_en">Datasheet link (english)</Label>
                <Input
                  onChange={handleChange}
                  id="datasheet_en"
                  name="datasheet_en"
                  value={wine.datasheet_en || ""}
                  placeholder="url to file"
                />
              </FormGroup>
            </Col>
          </Row>

          <h6 className="text-info">
            This plugin automatically removes the domain from all the url fields
            once you save it, in order to properly show the image if
            export/import its database between both sites
            ("vinicolalanuestra.com" and "lanuestrallc.com"). So, don't worry,
            just copy and paste the url as normal.
          </h6>

          <div className="d-flex gap-4 float-end">
            <Button
              color="danger"
              type="button"
              disabled={!item || waiting}
              onClick={deleteWine}
            >
              Delete
            </Button>
            <Button color="primary" type="submit" disabled={waiting}>
              {item ? "Update" : "Add"} wine
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default WineForm;

// const wineObj = {
//   name: 'Princesa',
//   image_url: '/wp-content/uploads/media/Princesa-Botella-sombra-1.png',
//   status: 'published',
//   description_es:
//     'Un vino de uvas Cabernet Sauvignon seleccionadas y una esmerada crianza en barrica de roble franc??s. El resultado: Unos aromas v??vidos aunque maduros, un paladar jovial pero distinguido, un cuerpo esbelto y a la vez elegante. Princesa es un vino sofisticado que hace especial el momento.',
//   description_en:
//     'A Cabernet Sauvignon wine made from selected grapes and a careful aging in French oak barrels. The result: Vivid and ripe aromas, a jovial yet distinguished palate, slender and at the same time elegant body. Princesa is a sophisticated wine that makes the moment special.',
//   grape_varietal_es: 'Cabernet Sauvignon',
//   origin_country_es: 'Valles de Baja California, Mexico',
//   food_pairing_es:
//     'Ideal con un ceviche de pescado, ensalada con ara??ndano y queso de cabra o un pollo frito con chutney de cereza',
//   awards_es: 'PLATA | A??ada 2012\n2015 Pacific Rim Wine Competition',
//   grape_varietal_en: 'Cabernet Sauvignon',
//   origin_country_en: 'Baja California Valleys, Mexico',
//   food_pairing_en: 'Great with primerib, blue cheeseburger and hotdogs wrapped in panchetta.',
//   awards_en: 'SILVER | Vintage 2012\n2015 Pacific Rim Wine Competition',
//   award_image: '/wp-content/uploads/media/MEDALLA-Princesa-PacificRim-min.png',
//   bottle_price_es: '$250 por botella | $2000 caja con doce',
//   bottle_price_en: '$9.99 per bottle | $89 12-count box',
//   datasheet_es: '/wp-content/uploads/media/Princesa-2017-FichaTe??cnica-NotaCata-Esp-min.pdf',
//   datasheet_en: '/wp-content/uploads/media/Princesa-en.pdf',
// };
