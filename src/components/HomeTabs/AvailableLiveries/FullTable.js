import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import AircraftAccordion from './AircraftAccordion';
import GetIndexOfLiveryInArray from '../../../helpers/GetIndexOfLiveryInArray';

/**
 * Displays a table of all aircraft and their liveries
 *
 * @export
 * @param {{liveries: object}} props
 * @return {React.ReactNode}
 */
export default function FullTable(props) {
  const { sortedLiveries, allAircraft, disabled, installedLiveries, selectedLiveries, setSelectedLiveries } = props;

  function AddSelectedLivery(liv) {
    // Don't edit the list if it's disabled! (Duh!!)
    if (disabled) return;

    if (Array.isArray(liv)) {
      setSelectedLiveries(selectedLiveries => {
        let x = [...selectedLiveries];

        liv.forEach(l => {
          if (GetIndexOfLiveryInArray(l, selectedLiveries)[0] === -1) {
            x.push(l);
          }
        });

        return x;
      });
    } else {
      setSelectedLiveries(selectedLiveries => {
        if (GetIndexOfLiveryInArray(liv, selectedLiveries)[0] === -1) {
          let x = [...selectedLiveries, liv];

          return x;
        }

        return selectedLiveries;
      });
    }
  }

  function RemoveSelectedLivery(liv) {
    // Don't edit the list if it's disabled! (Duh!!)
    if (disabled) return;

    setSelectedLiveries(selectedLiveries => {
      if (Array.isArray(liv)) {
        let x = [...selectedLiveries];

        liv.forEach(l => {
          const index = GetIndexOfLiveryInArray(l, x)[0];

          if (index === -1) {
            // Livery already isn't in the array
            return;
          }

          x.splice(index, 1);
        });

        return x;
      } else {
        const index = GetIndexOfLiveryInArray(liv, selectedLiveries)[0];

        if (index === -1) {
          // Livery already isn't in the array
          return selectedLiveries;
        }

        let x = [...selectedLiveries];
        x.splice(index, 1);

        return x;
      }
    });
  }

  return (
    <Box>
      {allAircraft.map(ac => (
        <AircraftAccordion
          disabled={disabled}
          key={ac.name}
          aircraft={ac}
          sortedLiveries={sortedLiveries[ac.name]}
          AddSelectedLivery={AddSelectedLivery}
          RemoveSelectedLivery={RemoveSelectedLivery}
          installedLiveries={installedLiveries.filter(o => o.airplane.toLowerCase() === ac.name.toLowerCase())}
          selectedLiveries={selectedLiveries}
        />
      ))}
    </Box>
  );
}

FullTable.propTypes = {
  sortedLiveries: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        airplane: PropTypes.string.isRequired,
        fileName: PropTypes.string.isRequired,
        generation: PropTypes.string.isRequired,
        metaGeneration: PropTypes.string.isRequired,
        lastModified: PropTypes.string.isRequired,
        ETag: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        checkSum: PropTypes.string.isRequired,
        image: PropTypes.string,
        smallImage: PropTypes.string,
      })
    )
  ),
  installedLiveries: PropTypes.arrayOf(
    PropTypes.shape({
      airplane: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      generation: PropTypes.string.isRequired,
      metaGeneration: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired,
      ETag: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      checkSum: PropTypes.string.isRequired,
      image: PropTypes.string,
      smallImage: PropTypes.string,
    })
  ),
  allAircraft: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, thumbnail: PropTypes.string })),
  selectedLiveries: PropTypes.arrayOf(
    PropTypes.shape({
      airplane: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      generation: PropTypes.string.isRequired,
      metaGeneration: PropTypes.string.isRequired,
      lastModified: PropTypes.string.isRequired,
      ETag: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      checkSum: PropTypes.string.isRequired,
      image: PropTypes.string,
      smallImage: PropTypes.string,
    })
  ),
  setSelectedLiveries: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

FullTable.defaultProps = {
  disabled: false,
  setSelectedLiveries: () => {},
};
