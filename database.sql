CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

-- NOTE: datatypes are all set to varchar due to how data was imported 
-- from .csv file - ideally should include float and int as well
CREATE TABLE pitches (
    MlbGameID VARCHAR,
    AutoPitchType VARCHAR,
    Outcome VARCHAR,
    Outs VARCHAR,
    OutsOnPlay VARCHAR,
    PitchOfGame VARCHAR,
    PitcherID VARCHAR,
    PitcherSet VARCHAR,
    PitcherThrowing VARCHAR,
    PlayResult VARCHAR,
    RelSpeed VARCHAR,
    Result VARCHAR,
    RunsScored VARCHAR,
    Strikes VARCHAR,
    Swing VARCHAR,
    ZoneSpeed VARCHAR
);


CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    owner INT NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(id)
        ON DELETE CASCADE,
    pitcherid VARCHAR NOT NULL
);

