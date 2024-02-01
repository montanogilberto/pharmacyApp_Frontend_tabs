import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="widget">
        <h2>Total Sales</h2>
        <p>$500,000</p>
      </div>
      <div className="widget">
        <h2>Top Products</h2>
        <ul>
          <li>Product A</li>
          <li>Product B</li>
          <li>Product C</li>
        </ul>
      </div>
      <div className="widget">
        <h2>Recent Transactions</h2>
        <ul>
          <li>Transaction 1</li>
          <li>Transaction 2</li>
          <li>Transaction 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
