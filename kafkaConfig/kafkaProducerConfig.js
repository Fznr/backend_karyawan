import { Kafka, CompressionTypes, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

// Buat instance producer
const producer = kafka.producer({
  compression: CompressionTypes.GZIP,
  createPartitioner: Partitioners.LegacyPartitioner
});

async function sendMessage(topic, message) {
  try {
    await producer.connect();

    await producer.send({
      topic: topic,
      messages: [
        { value: message }
      ]
    });

    console.log('Pesan berhasil dikirim');
  } catch (error) {
    console.error('Gagal mengirim pesan:', error);
  } finally {
    await producer.disconnect();
  }
}

export {sendMessage};
