package br.com.orlandoburli.seguranca.core.converters;

import com.fasterxml.jackson.core.SerializableString;
import com.fasterxml.jackson.core.io.CharacterEscapes;

public class CustomCharacterEscapes extends CharacterEscapes {

	private static final long serialVersionUID = 1L;

	private final int[] _asciiEscapes;

	public CustomCharacterEscapes() {
		this._asciiEscapes = standardAsciiEscapesForJSON();
		this._asciiEscapes['\\'] = CharacterEscapes.ESCAPE_NONE;
	}

	@Override
	public int[] getEscapeCodesForAscii() {
		return this._asciiEscapes;
	}

	@Override
	public SerializableString getEscapeSequence(int i) {
		return null;
	}
}
