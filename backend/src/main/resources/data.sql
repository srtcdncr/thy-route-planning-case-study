INSERT INTO location (id, name, country, city, locationCode) VALUES
(default, 'Taksim Square', 'Turkey', 'Istanbul', 'TAKSIM'),
(default, 'Istanbul Airport', 'Turkey', 'Istanbul', 'IST'),
(default, 'Istanbul Sabiha Gökçen Airport', 'Turkey', 'Istanbul', 'SAW'),
(default, 'London Heathrow Airport', 'UK', 'London', 'LHR'),
(default, 'Wembley Stadium', 'UK', 'London', 'WEMBLEY');

INSERT INTO transport (id, origin, destination) VALUES
(default, 'IST', 'LHR'),   -- Istanbul Airport ➡ London Heathrow Airport (FLIGHT)
(default, 'SAW', 'LHR'),   -- Istanbul Sabiha Gökçen Airport ➡ London Heathrow Airport (FLIGHT)
(default, 'LHR', 'WEMBLEY'),   -- London Heathrow Airport ➡ Webley Stadium (BUS)(UBER)
(default, 'TAKSIM', 'SAW'),   -- Taksim Square ➡ Istanbul Sabiha Gökçen Airport (BUS)
(default, 'TAKSIM', 'IST'); -- Taksim Square ➡ Istanbul Airport (SUBWAY)(UBER)

INSERT INTO transport_transportationType (id, transportationType) VALUES
(1, 'FLIGHT'),
(2, 'FLIGHT'),
(3, 'BUS'),
(3, 'UBER'),
(4, 'BUS'),
(5, 'SUBWAY'),
(5, 'UBER');