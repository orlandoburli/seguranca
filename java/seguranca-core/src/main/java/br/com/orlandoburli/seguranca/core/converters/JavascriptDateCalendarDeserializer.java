package br.com.orlandoburli.seguranca.core.converters;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class JavascriptDateCalendarDeserializer extends JsonDeserializer<Calendar> {

	@Override
	public Calendar deserialize(JsonParser jsonparser, DeserializationContext context)
			throws IOException, JsonProcessingException {
		String dateAsString = jsonparser.getText();
		return parse(dateAsString);
	}

	public static Calendar parse(String dateAsString) {
		if (dateAsString == null || dateAsString.trim().isEmpty()) {
			return null;
		}
		try {
			Date date = JavascriptDateCalendarSerializer.FORMATTER.parse(dateAsString);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);

			return calendar;
		} catch (ParseException e) {
			e.printStackTrace();

			return null;
		}

	}
}
