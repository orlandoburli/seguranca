package br.com.orlandoburli.seguranca.core.converters;

import java.io.IOException;

import org.hibernate.proxy.pojo.javassist.JavassistLazyInitializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class HibernateLazyInitializerSerializer extends JsonSerializer<JavassistLazyInitializer> {

	@Override
	public void serialize(JavassistLazyInitializer initializer, JsonGenerator jsonGenerator,
			SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
		jsonGenerator.writeNull();
	}

}
