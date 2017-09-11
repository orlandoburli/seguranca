﻿CREATE TABLE TORRE (
	ID NUMERIC(8) NOT NULL,
	NOME VARCHAR(100) NOT NULL,
	ATIVO CHAR(1) DEFAULT 'A' NOT NULL,
	QUANTIDADE_ANDARES NUMERIC(2) NULL,
	UNIDADES_POR_ANDAR NUMERIC(2) NULL,
	FLAG_TERREO CHAR(1) DEFAULT 'S' NOT NULL,
	CONSTRAINT PK_TORR PRIMARY KEY (ID)
);

CREATE TABLE BLOCO (
	ID NUMERIC(8) NOT NULL,
	NOME VARCHAR(100) NOT NULL,
	ATIVO CHAR(1) DEFAULT 'A' NOT NULL,
	CONSTRAINT PK_BLOCO PRIMARY KEY (ID)
);

CREATE TABLE UNIDADE (
	ID NUMERIC(8) NOT NULL,
	NUMERO VARCHAR(100) NOT NULL,
	ID_BLOCO NUMERIC(8) NOT NULL,
	ID_TORRE NUMERIC(8) NOT NULL,
	ATIVO CHAR(1) DEFAULT 'A' NOT NULL,
	CONSTRAINT PK_UNIDADE PRIMARY KEY (ID),
	CONSTRAINT FK_UNIDADE_BLOCO FOREIGN KEY (ID_BLOCO) REFERENCES BLOCO (ID),
	CONSTRAINT FK_UNIDADE_TORRE FOREIGN KEY (ID_TORRE) REFERENCES TORRE (ID)
);

CREATE SEQUENCE SEQ_TORRE;
CREATE SEQUENCE SEQ_BLOCO;
CREATE SEQUENCE SEQ_UNIDADE;
