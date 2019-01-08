import time
import requests

if __name__ == "__main__":
	while (1):
		temperature = requests.get("http://192.168.1.153:5000/get_temperature")
		try:
			temperature = temperature.text
		except:
			temperature = ""

		if "127" in temperature:
		    requests.get("https://api.telegram.org/bot{}/sendMessage?text=В доме огонь! Выход открыт. Звоните 112!&chat_id=75024699".format(TOKEN))
			requests.get("http://192.168.1.153:5000/set_lcd_text?text=Fire! Open moto. Call 112!")
			status = requests.get("http://192.168.1.153:5000/status_motor")
			try:
				status = status.text
			except:
				status = "open"

			if "close" in status.lower():
				requests.get("http://192.168.1.153:5000/turn_motor")
		elif "-" in temperature:
		    requests.get("https://api.telegram.org/bot{}/sendMessage?text=В доме слишком холодно! Температура поднимается до допустимой. Выход открыт.&chat_id=75024699".format(TOKEN))
			requests.get("http://192.168.1.153:5000/set_lcd_text?text=Cold! Open moto.")

			status = requests.get("http://192.168.1.153:5000/status_motor")
			try:
				status = status.text
			except:
				status = "open"

			if "close" in status.lower():
				requests.get("http://192.168.1.153:5000/turn_motor")

		time.sleep(1)
