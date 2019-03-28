const { JWK, JWE } = require('node-jose');
var net = require('net');
var jose = require('node-jose');

const makeKey = pem => JWK.asKey(pem, 'pem');

// keystore = jose.JWK.createKeyStore();

const payload = {
  deviceId: 'TEST_2223',
  deviceTyape: 'POLL_PRO',
  payload: {
    d: {
      g1: 10,
      g2: 20
    }
  }
};
startServer();
async function startServer() {
  const publicKey = await makeKey(`-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYTA/OFJg9fsAGZjj3CocuKBFs
  a5OKW3OkZWqNdcw1ewSSv5HBdo51HR2ZLKKpoHXHQ0YVtqZt/jEGfWzpYmyI97jq
  OLcDFY8ByTH10/zYrgpnKLec9Z82/f3PeedN9cOaatqUh7g5RIoa800flU3bmmV+
  OedRQWpEzntDfPzwnQIDAQAB
  -----END PUBLIC KEY-----`);
  const privateKey = await makeKey(`-----BEGIN RSA PRIVATE KEY-----
  MIICWwIBAAKBgQCYTA/OFJg9fsAGZjj3CocuKBFsa5OKW3OkZWqNdcw1ewSSv5HB
  do51HR2ZLKKpoHXHQ0YVtqZt/jEGfWzpYmyI97jqOLcDFY8ByTH10/zYrgpnKLec
  9Z82/f3PeedN9cOaatqUh7g5RIoa800flU3bmmV+OedRQWpEzntDfPzwnQIDAQAB
  AoGAAS0FKjgqfL8PyHzdj7q7FHYmvEmQWA8gs3I9Al6Ydwk+Hcvw2ieKLglNgzM/
  BkRA5Ir2bZB9dHfz9PLe9mZWJC2F0hLBDqYMqemBhWnobfAg2ZOxsnV7mQDJeqhG
  ccGMalPpGm7fK6eBztnLqZNgd3B27wz2Z3I7c8aDdpBpTlkCQQDXyqcbdDck/3Wg
  Lhp20mG/pnSxe57MfjP2plsb0RnEjxNhG/szqq+DnTjv2MoozU+ADAer/1B8VAFu
  vuiOmwULAkEAtKyyILyFj8UyBN/6Ai2T/i53wXedb+4sUfmiBoJ09Ggx4IvVCmNH
  o9p9Bz4C8AWzGCMRa8dqsWg4Qsbwv+cZ9wJAKD4019vehNnXV94BNXOaoyEp1geV
  39ERY8g2aYOfaJa+KHgNat9ECCmD+sbVPLK9RsX3kE329pi8A6k6uY2TbQJATSLd
  +fQC4drC/CnTx1JGOOMF5ed3o+3/pg/6COVxoVdK1B9fGUxBrcb+UjU7c9Y7HDb8
  nRNKjet8+aWN66BzCQJAfOjnkxNQgz0TrT8EL5rzdeGLPIxEet7hQTTLuWQMVqKW
  g7LqNzRYap6Bb4KgVInRyW5UIb18tGNlt2J2Ec9fCQ==
  -----END RSA PRIVATE KEY-----`);

  jose.JWE.createEncrypt({ format: 'compact'}, publicKey).update(new Buffer(JSON.stringify(payload))).final().then(encrypted => {          //was encrypted here
    console.log("--------------------------------------------------------------------------------------");
    console.log(encrypted);     //was Encrypted here
    console.log("--------------------------------------------------------------------------------------");
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // console.log(JSON.stringify(encrypted));
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    var server = net.createServer(function (socket) {
      socket.write(JSON.stringify(encrypted));          //was encrypted here
      socket.pipe(socket);
    });
    server.listen(1337, '127.0.0.1');
  });

 
}



