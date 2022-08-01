import React from 'react';
import { getWines, isEmptyArray } from '../../utils/helpers';
import WineRow from '../../components/WineRow.jsx';
import DataSheetModal from '../../components/DataSheetModal.jsx';

const Public = () => {
  const [wines, setWines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dataSheet, setDataSheet] = React.useState(null);

  const isMX = window.location.pathname.includes('/en/') ? false : true;

  React.useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    setLoading(true);
    const res = await getWines();
    setWines(res);
    setLoading(false);
  };

  const openModal = datasheet => {
    setDataSheet(datasheet);
    setIsOpen(true);
  };

  const closeModal = () => {
    setDataSheet(null);
    setIsOpen(false);
  };

  function renderWines() {
    if (loading) return <h2>Loading...</h2>;

    if (isEmptyArray(wines) && !loading) return <h2>No items found</h2>;

    if (!isEmptyArray(wines) && !loading)
      return wines
        .filter(p => p.status === 'published')
        .map((w, idx) => <WineRow wine={w} isMX={isMX} idx={idx} openModal={openModal} />);
  }

  return (
    <React.Fragment>
      {renderWines()}
      {isOpen && <DataSheetModal isOpen={isOpen} close={closeModal} datasheet={dataSheet} />}
    </React.Fragment>
  );
};

export default Public;
