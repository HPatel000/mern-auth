import React, { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';

const Alert = () => {
  const AlertContext = useContext(alertContext);
  const { alerts } = AlertContext;
  return (
    alerts.lenght > 0 && alerts.map(alert => (
      <div key={alert.id}>{alert.msg}</div>
    ))
  )
}

export default Alert;