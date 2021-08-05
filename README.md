# PCD Flooring Corporation

## Team Members
- Dixaben Patel
- Edward Chung
- Yang Dai

## Brief Description
Build up an auto-management system to help a flooring corporation to manage the orders, deliveries and its inventory.

### Core Features
- Log-in page: (The first page)
  - sign up or log page and according to user will direct to different sub-pages.
- Inventory page: (Owner and warehouse managers only)
    -  Check all productions (floorings, tiles, paints, accessories)
    -  Find one production, then can modify/ delete it; and also can check its information (inventory, purchasing history, next time to purchase new production from factories) 
    -  add new production.
- Sellers page: (Owner and sellers only)
  - add new orders.
  - check existed orders, then can modify/ delete this order. and also can see its selling information (selling price, amount, delivery information).
  - check production’s information (inventory, suggested purchasing next date, sales).
  - complete the order (owner and sellers only) ——— there are two status of the delivery.
- Delivery page: (Owner, sellers and warehouse managers) 
  -  Ship items to customers.
      - add new deliveries.
      -  check existed deliveries, then can modify/ delete it; and also can check its information.
      -  complete the delivery.
  -  Receive items from manufactory
      - add new deliveries.
      -  check existed deliveries, then can modify/ delete it; and also can check its information.
      -  complete the delivery.
- Accounting page: (Owner only)
  - check all orders (productions, amount, selling price, purchasing price, sales, status of the order).
  - complete the order: after get the completed flag from sellers page, the boss can approve this order completed; and only after this, the finance part in database would be changed.
### Extra Features
- On delivery page: link the google maps, analysis all delivery and make a more reasonable schedule.
- On inventory page: according to purchasing and selling history, schedule the amount and the time of the next purchasing.
- On sellers page: according to the selling history, connect with the bid data from website, give suggested or min selling price of one item.

