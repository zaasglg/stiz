<?php
require_once 'vendor/autoload.php';

// Отправка заказа через PHPMailer
header('Content-Type: application/json; charset=utf-8');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
    exit;
}

// Получаем данные из POST
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$product = isset($_POST['product']) ? trim($_POST['product']) : '';

// Валидация данных
if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Не заполнены обязательные поля']);
    exit;
}

// Подключаем PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

try {
    $mail = new PHPMailer(true);

    // Настройки SMTP (замените на ваши данные)
    $mail->isSMTP();
    $mail->Host       = 'dnmc.kz'; // SMTP сервер
    $mail->SMTPAuth   = true;
    $mail->Username   = 'stiz@dnmc.kz'; // Ваша почта
    $mail->Password   = 'l15nJ*19i';    // Пароль приложения
    


    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Настройки письма
    $mail->setFrom('stiz@dnmc.kz', 'Сайт СТИЗ');
    $mail->addAddress('n4msin@mail.ru', 'Заказы СТИЗ');

    // Содержимое письма
    $mail->isHTML(true);
    $mail->Subject = 'Новый заказ с сайта СТИЗ - ' . $name;
    
    $mail->Body = "
    <h2>Поступил новый заказ с сайта СТИЗ</h2>
    <p><strong>Клиент:</strong> {$name}</p>
    <p><strong>Телефон:</strong> {$phone}</p>
    <p><strong>Товар:</strong> {$product}</p>
    <p><strong>Дата заказа:</strong> " . date('d.m.Y H:i:s') . "</p>
    <hr>
    <p><em>Автоматическое уведомление с сайта СТИЗ</em></p>
    ";

    $mail->AltBody = "
    Поступил новый заказ с сайта СТИЗ:
    
    Клиент: {$name}
    Телефон: {$phone}
    Товар: {$product}
    Дата заказа: " . date('d.m.Y H:i:s') . "
    
    ---
    Автоматическое уведомление с сайта СТИЗ
    ";

    $mail->send();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.'
    ]);

} catch (Exception $e) {
    error_log("Ошибка отправки письма: {$mail->ErrorInfo}");
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Произошла ошибка при отправке заказа. Попробуйте еще раз или свяжитесь с нами по телефону.'
    ]);
}
?>