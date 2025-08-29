-- Connect to the hyf_musicians database or create it
-- DROP DATABASE IF EXISTS hyf_musicians; -- Uncomment if needed
-- CREATE DATABASE hyf_musicians;
-- \c hyf_musicians;

BEGIN;

CREATE TABLE Musicians(
    Id INTEGER NOT NULL,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Born INTEGER NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE InstrumentsPlayed(
    Id INTEGER NOT NULL,
    Musician INTEGER NOT NULL,
    Instrument TEXT NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (Musician) REFERENCES Musicians(Id)
);

INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (1, 'Thelonious', 'Monk', 1917);
INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (2, 'Sonny', 'Rollins', 1930);
INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (3, 'Steve', 'Lehman', 1978);

INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (1, 1, 'Piano');
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (2, 2, 'Tenor saxophone');
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (3, 2, 'Soprano saxophone');
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (4, 3, 'Alto saxophone');

COMMIT;
