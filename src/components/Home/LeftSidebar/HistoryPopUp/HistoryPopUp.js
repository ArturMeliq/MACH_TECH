import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../_common/Tabel/Table';
import Modal from '../../../_common/Modal/Modal';

const HistoryPopUp = ({
  data, headerData, showingHistory, showHistory,
}) => (
  <Modal onClose={showingHistory} show={showHistory} modalTitle="История">
    <Table
      tableTitle="История"
      tableHeaderData={headerData}
      data={data}
      showingTble={showHistory}
      closeTable={showingHistory}
    />
  </Modal>
);
HistoryPopUp.propTypes = {
  data: PropTypes.array.isRequired,
  headerData: PropTypes.array.isRequired,
  showingHistory: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired,
};
export default HistoryPopUp;
