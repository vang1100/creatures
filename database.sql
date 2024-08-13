-- CREATE DATABASE "full-stack-react";

-- Table structure
CREATE TABLE "creatures" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(25) NOT NULL,
	"origin" VARCHAR(50) NOT NULL,
	"immortal" BOOLEAN DEFAULT false,
	"sightings" INTEGER DEFAULT 0
);

INSERT INTO "creatures" ("name", "origin", "immortal")
VALUES ('Jakalope', 'USA', false), 
('Chupacabra', 'Mexico', false), 
('Phoenix', 'Saudi Arabia', true);

