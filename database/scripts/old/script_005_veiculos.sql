﻿CREATE TABLE VEICULO (
	ID NUMERIC(8) NOT NULL,
	MARCA VARCHAR(100) NULL,
	MODELO VARCHAR(100) NULL,
	COR VARCHAR(100) NULL,
	PLACA VARCHAR(20) NOT NULL,
	ANO NUMERIC(4) NULL,
	ATIVO CHAR(1) DEFAULT 'A' NOT NULL,
	ID_MORADOR NUMERIC(8) NOT NULL,
	CONSTRAINT PK_VEICULO PRIMARY KEY (ID),
	CONSTRAINT FK_VEICULO_MORADOR FOREIGN KEY (ID_MORADOR) REFERENCES MORADOR (ID)
);

CREATE SEQUENCE SEQ_VEICULO;
