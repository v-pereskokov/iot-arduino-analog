import serial
import time
from flask import Flask, request

app = Flask(__name__)
lcd = serial.Serial('COM5', 9600, timeout=5)
stepper = serial.Serial("COM7", 9600, timeout=5)
temperature = serial.Serial("COM9", 9600, timeout=5)


# LCD
@app.route('/set_lcd_text')
def set_lcd_text():
	lcd.write(bytes("s{}#".format(request.args.get('text', '')), 'UTF-8'))
	return 'Ok'

@app.route('/clear_lcd')
def clear_lcd():
	lcd.write(bytes("h#", 'UTF-8'))
	return 'Ok'

@app.route('/get_lcd_text')
def get_lcd_text():
	lcd.write(bytes("r#", 'UTF-8'))
	return lcd.readline()

@app.route('/is_ok_lcd')
def is_ok_lcd():
	try:
		lcd.write(bytes("sTest#", 'UTF-8'))
		lcd.write(bytes("r#", 'UTF-8'))
		result = lcd.readline().decode('utf-8')
		lcd.write(bytes("h#", 'UTF-8'))

		if len(result) == 0:
			return 'False', 404
		return 'True'
	except Exception as e: 
		print(e)
		return 'False', 404


# Stepper
@app.route('/turn_motor')
def turn_motor():
	stepper.write(bytes("t", 'UTF-8'))
	return stepper.readline()

@app.route('/status_motor')
def status_motor():
	stepper.write(bytes("r", 'UTF-8'))
	return stepper.readline()

@app.route('/is_ok_motor')
def is_ok_motor():
	stepper.write(bytes("r", 'UTF-8'))
	result = stepper.readline().decode('utf-8')

	if len(result) == 0:
		return 'False', 404
	return 'True'


# Temperature
@app.route('/get_temperature')
def get_temperature():
	temperature.write(bytes("t", 'UTF-8'))
	return temperature.readline()

@app.route('/change_temperature')
def change_temperature():
	type_of_change = request.args.get('type', 'up')
	temperature.write(bytes('u' if type_of_change == 'up' else 'l', 'UTF-8'))
	return temperature.readline()

@app.route('/is_ok_temp')
def is_ok_temp():
	temperature.write(bytes("t", 'UTF-8'))
	result = temperature.readline().decode('utf-8')

	if len(result) == 0:
		return 'False', 404
	return 'True'


if __name__ == '__main__':
	app.run(host='0.0.0.0')
