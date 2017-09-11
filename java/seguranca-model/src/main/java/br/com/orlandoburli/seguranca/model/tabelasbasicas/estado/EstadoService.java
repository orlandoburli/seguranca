package br.com.orlandoburli.seguranca.model.tabelasbasicas.estado;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import br.com.orlandoburli.seguranca.model.tabelasbasicas.estado.Estado;

public class EstadoService {

	public List<Estado> getAll() {
		List<Estado> list = new ArrayList<>();

		list.add(new Estado("AC", "Acre"));
		list.add(new Estado("AL", "Alagoas"));
		list.add(new Estado("AP", "Amapá"));
		list.add(new Estado("AM", "Amazonas"));
		list.add(new Estado("BA", "Bahia"));
		list.add(new Estado("CE", "Ceará"));
		list.add(new Estado("DF", "Distrito Federal"));
		list.add(new Estado("ES", "Espírito Santo"));
		list.add(new Estado("GO", "Goiás"));
		list.add(new Estado("MA", "Maranhão"));
		list.add(new Estado("MT", "Mato Grosso"));
		list.add(new Estado("MS", "Mato Grosso do Sul"));
		list.add(new Estado("MG", "Minas Gerais"));
		list.add(new Estado("PA", "Pará"));
		list.add(new Estado("PB", "Paraíba"));
		list.add(new Estado("PR", "Paraná"));
		list.add(new Estado("PE", "Pernambuco"));
		list.add(new Estado("PI", "Piauí"));
		list.add(new Estado("RJ", "Rio de Janeiro"));
		list.add(new Estado("RN", "Rio Grande do Norte"));
		list.add(new Estado("RS", "Rio Grande do Sul"));
		list.add(new Estado("RO", "Rondônia"));
		list.add(new Estado("RR", "Roraima"));
		list.add(new Estado("SC", "Santa Catarina"));
		list.add(new Estado("SP", "São Paulo"));
		list.add(new Estado("SE", "Sergipe"));
		list.add(new Estado("TO", "Tocantins"));

		Collections.sort(list, new Comparator<Estado>() {
			@Override
			public int compare(Estado o1, Estado o2) {
				return o1.getNome().compareTo(o2.getNome());
			}
		});

		return list;
	}
}