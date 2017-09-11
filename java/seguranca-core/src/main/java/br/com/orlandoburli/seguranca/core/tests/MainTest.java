package br.com.orlandoburli.seguranca.core.tests;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class MainTest {

	public static void main(String[] args) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, 2014);
		cal.set(Calendar.MONTH, 5);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR, 20);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);

		System.out.println(cal.getTimeInMillis());
		System.out.println(sdf.format(cal.getTime()));

		Calendar cal2 = Calendar.getInstance();
		cal2.setTimeInMillis(1401667200000L);
		// 1401667200000

		System.out.println(sdf.format(cal2.getTime()));

	}
}
