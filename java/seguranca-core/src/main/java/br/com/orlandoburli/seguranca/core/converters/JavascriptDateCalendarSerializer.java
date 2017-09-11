package br.com.orlandoburli.seguranca.core.converters;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class JavascriptDateCalendarSerializer extends JsonSerializer<Calendar> {

	public static final SimpleDateFormat FORMATTER = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

	@Override
	public void serialize(Calendar value, JsonGenerator gen, SerializerProvider arg2)
			throws IOException, JsonProcessingException {
		if (value == null) {
			gen.writeNull();
		} else {
			String string = "";

			gen.setCharacterEscapes(new CustomCharacterEscapes());

			string += "\\";
			string += "/Date(";
			string += Long.toString(value.getTimeInMillis());
			string += ")";
			string += "\\";
			string += "/";

			gen.writeString(string);
		}
	}
}
