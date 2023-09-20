import React from 'react';
import PropTypes from 'prop-types';
import classes from './table.module.scss';

const Table = ({
  className,
  tableHeaderData,
  data,
}) => (
  <div className={`${classes.wrapper} ${className}`}>

    <table className={classes.table}>
      <thead>

        <tr>
          {tableHeaderData.map(({
            title,
            Icon,
            width,
            minWidth,
            maxWidth,
            fontSize,
          }) => (
            <th
              key={title}
              style={
              {
                width: width || 'auto',
                minWidth: minWidth || 'auto',
                maxWidth: maxWidth || 'auto',
                fontSize: fontSize || 14,
              }
            }
            >
              {Icon
                ? (
                  <>
                    <Icon className={classes.header_icon} />
                    {' '}
                    {title}
                  </>
                ) : title}
            </th>
          ))}

        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            {tableHeaderData.map(({
              title,
              path,
              photo,
              width,
              minWidth,
              maxWidth,
              fontSize,
            }) => (
              <td
                key={title}
                style={
                {
                  width: width || 'auto',
                  minWidth: minWidth || 'auto',
                  maxWidth: maxWidth || 'auto',
                  fontSize: fontSize || 14,
                }
              }
              >
                {d[photo] ? (
                  <div className={classes.user_info_block}>
                    <div className={classes.user_photo_block}>
                      <img className={classes.user_photo} src={d[photo]} alt="photo" />
                    </div>
                    <p className={classes.user_text}>
                      {d[path]}
                    </p>
                  </div>
                ) : (
                  <p>
                    {d[path]}
                  </p>
                )}

              </td>
            ))}
          </tr>
        ))}

      </tbody>
    </table>
  </div>

);
Table.propTypes = {
  data: PropTypes.array.isRequired,
  tableHeaderData: PropTypes.array.isRequired,
  className: PropTypes.string,
};
Table.defaultProps = {
  className: '',
};
export default Table;
