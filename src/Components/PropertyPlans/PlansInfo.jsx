import React from "react";
import './PlansInfo.css';

const PlansInfo = () => {
  return (
    <div className="plans-info-container">
      <h1>Understanding Our Plans & Coin Model</h1>

      <p>
        At Townmanor Technologies, we believe in providing real estate agents
        with flexible and powerful tools to boost their visibility, connect with
        property owners, and maximize their chances of success. To achieve this,
        we offer various subscription plans tailored to the specific needs of
        real estate professionals. Our plans utilize a virtual currency system
        called "Coins" that makes it easier for agents to access premium
        features, purchase details, and increase their visibility in the real
        estate marketplace.
      </p>

      <h2>What are Coins?</h2>
      <p>
        Coins are a virtual currency designed specifically for our platform. As
        a real estate agent, you can purchase coins through our platform and use
        them to unlock features like detailed owner information, premium listing
        services, and exclusive spotlight options. The coin model ensures
        flexibility in your spending—you can choose how and when to use your
        coins, depending on your current needs.
      </p>

      <h2>How Does the Coin Model Work?</h2>
      <p>
        Every feature, subscription, or service on our platform is assigned a
        coin value. To use these services, you will first need to purchase the
        corresponding number of coins. Once you have coins in your account, you
        can spend them as follows:
      </p>
      <ul>
        <li>
          **Purchasing Owner Details:** You can use coins to unlock detailed
          information about property owners, making it easier to contact them
          and discuss potential deals.
        </li>
        <li>
          **Featured Listings:** You can promote your properties in prominent
          positions across multiple listings to attract more attention from
          buyers and sellers.
        </li>
        <li>
          **Exclusive Spotlight:** This plan puts your profile in the spotlight,
          maximizing visibility and ensuring that you stand out among other
          agents in key markets.
        </li>
      </ul>

      <h2>Our Subscription Plans</h2>
      <p>
        We offer a variety of plans designed to suit different goals and levels
        of involvement. Each plan is flexible, giving you the option to upgrade
        or extend your services depending on your growth needs.
      </p>

      <h3>1. Featured Agent Plan</h3>
      <p>
        The "Featured Agent" plan is designed for agents who want to increase
        their visibility across multiple listings. This plan helps agents gain
        more exposure and stand out in a competitive marketplace.
      </p>
      <ul>
        <li>Price: 2000 Coins</li>
        <li>Old Price: 10000 Coins</li>
        <li>Duration: 90 Days</li>
        <li>Benefits:</li>
        <ul>
          <li>90 Days of enhanced visibility</li>
          <li>Featured in multiple listings</li>
          <li>Boost visibility to attract more clients</li>
        </ul>
      </ul>

      <h3>2. Agent on Spotlight Plan</h3>
      <p>
        The "Agent on Spotlight" plan is ideal for agents who want exclusive
        visibility on specific projects. This plan ensures that your profile is
        highlighted and that your properties receive maximum exposure.
      </p>
      <ul>
        <li>Price: 5000 Coins</li>
        <li>Old Price: 20000 Coins</li>
        <li>Duration: 90 Days</li>
        <li>Benefits:</li>
        <ul>
          <li>90 Days of exclusive spotlight</li>
          <li>Maximize property exposure on key projects</li>
          <li>Attract premium clients with exclusive visibility</li>
        </ul>
      </ul>

      <h3>3. Owner Details Plans</h3>
      <p>
        Our Owner Details plans are perfect for agents who need detailed
        information about property owners. With these plans, you can unlock
        contact details and other vital information that helps you initiate
        negotiations and close deals quickly.
      </p>
      <ul>
        <li>Plan 1: 10 Details for 100 Coins</li>
        <li>Plan 2: 25 Details for 300 Coins</li>
        <li>Plan 3: 75 Details for 800 Coins</li>
        <li>All plans are valid for 90 days.</li>
      </ul>

      <h2>How to Choose a Plan</h2>
      <p>
        Choosing the right plan depends on your current goals as a real estate
        agent. If you want to increase your visibility and attract more clients,
        the "Featured Agent" or "Agent on Spotlight" plans are the best
        options. On the other hand, if you need access to detailed information
        about property owners to close deals, the "Owner Details" plans will
        provide the information you need.
      </p>

      <h2>How to Use Coins for Payments</h2>
      <p>
        After selecting your plan, you can pay using coins in a secure and easy
        manner. When you choose a plan, you will be redirected to the PayU
        payment gateway. Simply follow these steps:
      </p>
      <ol>
        <li>Select your preferred plan and click "Choose Plan" or "Unlock Now".</li>
        <li>
          Fill in your details (such as name and email) and click on the payment
          button.
        </li>
        <li>
          You'll be redirected to PayU’s secure payment page where your
          transaction will be processed.
        </li>
        <li>Once the transaction is successful, the plan will be activated.</li>
      </ol>

      <h2>Why Choose Us?</h2>
      <p>
        With our platform, real estate agents get access to an advanced set of
        tools and plans to grow their business. From boosting visibility to
        unlocking valuable owner details, we offer everything you need to
        enhance your real estate practice. By using our coin model, you can
        manage your expenses flexibly and invest in services that directly
        impact your success.
      </p>

      <h2>Start Today!</h2>
      <p>
        Whether you're a new agent looking to make a mark or a seasoned
        professional aiming to grow your client base, our plans and coin model
        offer a scalable solution for every need. Start today by choosing the
        right plan and take your real estate career to the next level!
      </p>
    </div>
  );
};

export default PlansInfo;
