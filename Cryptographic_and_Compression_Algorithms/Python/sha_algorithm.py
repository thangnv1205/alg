
import hashlib

def sha256_hash(data):
    # Chuyển đổi dữ liệu thành bytes nếu nó là chuỗi
    if isinstance(data, str):
        data = data.encode('utf-8')
    
    # Tạo đối tượng băm SHA256
    hasher = hashlib.sha256()
    
    # Cập nhật đối tượng băm với dữ liệu
    hasher.update(data)
    
    # Lấy giá trị băm dưới dạng chuỗi thập lục phân
    return hasher.hexdigest()

# Ví dụ sử dụng:
message1 = "Hello, world!"
hash1 = sha256_hash(message1)
print(f"Hash SHA256 của \"{message1}\": {hash1}")

message2 = "Hello, world! " # Có một khoảng trắng ở cuối
hash2 = sha256_hash(message2)
print(f"Hash SHA256 của \"{message2}\": {hash2}")

message3 = "Hello, world!"
hash3 = sha256_hash(message3)
print(f"Hash SHA256 của \"{message3}\": {hash3}")

print(f"Hash1 == Hash3: {hash1 == hash3}")
print(f"Hash1 == Hash2: {hash1 == hash2}")
