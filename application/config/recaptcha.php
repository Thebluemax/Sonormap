<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * Recaptcha configuration settings
 * 
 * recaptcha_sitekey: Recaptcha site key to use in the widget
 * recaptcha_secretkey: Recaptcha secret key which is used for communicating between your server to Google's
 * lang: Language code, if blank "en" will be used
 * 
 * recaptcha_sitekey and recaptcha_secretkey can be obtained from https://www.google.com/recaptcha/admin/
 * Language code can be obtained from https://developers.google.com/recaptcha/docs/language
 * 
 * @author Damar Riyadi <damar@tahutek.net>
 */
$config['recaptcha_sitekey'] = "6LcFcfYSAAAAAPNuPvU0vyODGWbSrrTLEVxUv0L0";
$config['recaptcha_secretkey'] = "6LcFcfYSAAAAAMnV41BOhJn-dpuUf2GWl79rk9Fh";
$config['lang'] = "es";