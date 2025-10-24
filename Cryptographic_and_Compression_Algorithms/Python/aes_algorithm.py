
"""
AES (Advanced Encryption Standard) Implementation
A simplified implementation of AES-128 encryption and decryption.
This is a basic implementation for educational purposes.
For production use, always use well-tested cryptographic libraries.
"""

import os
import hashlib
from typing import List, Tuple


class AES:
    """
    AES-128 implementation with basic encryption and decryption functionality.
    """
    
    # AES S-box
    S_BOX = [
        0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
        0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
        0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
        0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
        0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
        0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
        0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
        0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
        0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
        0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
        0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
        0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
        0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
        0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
        0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
        0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
    ]
    
    # Inverse S-box
    INV_S_BOX = [
        0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
        0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
        0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
        0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
        0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
        0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
        0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
        0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
        0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
        0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
        0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
        0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
        0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
        0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
        0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
        0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d
    ]
    
    # Round constants
    RCON = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]
    
    def __init__(self, key: bytes):
        """
        Initialize AES with a 128-bit key.
        
        @param key bytes - 16-byte encryption key
        """
        if len(key) != 16:
            raise ValueError("Key must be exactly 16 bytes (128 bits)")
        self.key = key
        self.round_keys = self._expand_key()
    
    def _expand_key(self) -> List[List[int]]:
        """
        Expand the initial key into round keys.
        
        @returns List[List[int]] - List of round keys
        """
        round_keys = []
        key_words = [list(self.key[i:i+4]) for i in range(0, 16, 4)]
        
        for i in range(44):  # 11 rounds * 4 words per round
            if i < 4:
                round_keys.append(key_words[i])
            else:
                temp = key_words[i-1][:]
                if i % 4 == 0:
                    # Rotate word
                    temp = temp[1:] + temp[:1]
                    # Substitute bytes
                    temp = [self.S_BOX[b] for b in temp]
                    # XOR with round constant
                    temp[0] ^= self.RCON[i//4 - 1]
                
                new_word = [a ^ b for a, b in zip(key_words[i-4], temp)]
                key_words.append(new_word)
                round_keys.append(new_word)
        
        return [round_keys[i:i+4] for i in range(0, 44, 4)]
    
    def _sub_bytes(self, state: List[List[int]], inverse: bool = False) -> List[List[int]]:
        """
        Apply S-box substitution to the state.
        
        @param state List[List[int]] - Current state matrix
        @param inverse bool - Whether to use inverse S-box
        @returns List[List[int]] - State after substitution
        """
        s_box = self.INV_S_BOX if inverse else self.S_BOX
        return [[s_box[state[i][j]] for j in range(4)] for i in range(4)]
    
    def _shift_rows(self, state: List[List[int]], inverse: bool = False) -> List[List[int]]:
        """
        Shift rows of the state matrix.
        
        @param state List[List[int]] - Current state matrix
        @param inverse bool - Whether to shift in reverse direction
        @returns List[List[int]] - State after row shifting
        """
        new_state = [row[:] for row in state]
        for i in range(1, 4):
            if inverse:
                new_state[i] = new_state[i][-i:] + new_state[i][:-i]
            else:
                new_state[i] = new_state[i][i:] + new_state[i][:i]
        return new_state
    
    def _mix_columns(self, state: List[List[int]], inverse: bool = False) -> List[List[int]]:
        """
        Mix columns of the state matrix.
        
        @param state List[List[int]] - Current state matrix
        @param inverse bool - Whether to use inverse mixing
        @returns List[List[int]] - State after column mixing
        """
        new_state = [[0] * 4 for _ in range(4)]
        
        for col in range(4):
            if inverse:
                new_state[0][col] = self._gf_mult(0x0e, state[0][col]) ^ self._gf_mult(0x0b, state[1][col]) ^ \
                                   self._gf_mult(0x0d, state[2][col]) ^ self._gf_mult(0x09, state[3][col])
                new_state[1][col] = self._gf_mult(0x09, state[0][col]) ^ self._gf_mult(0x0e, state[1][col]) ^ \
                                   self._gf_mult(0x0b, state[2][col]) ^ self._gf_mult(0x0d, state[3][col])
                new_state[2][col] = self._gf_mult(0x0d, state[0][col]) ^ self._gf_mult(0x09, state[1][col]) ^ \
                                   self._gf_mult(0x0e, state[2][col]) ^ self._gf_mult(0x0b, state[3][col])
                new_state[3][col] = self._gf_mult(0x0b, state[0][col]) ^ self._gf_mult(0x0d, state[1][col]) ^ \
                                   self._gf_mult(0x09, state[2][col]) ^ self._gf_mult(0x0e, state[3][col])
            else:
                new_state[0][col] = self._gf_mult(0x02, state[0][col]) ^ self._gf_mult(0x03, state[1][col]) ^ \
                                   state[2][col] ^ state[3][col]
                new_state[1][col] = state[0][col] ^ self._gf_mult(0x02, state[1][col]) ^ \
                                   self._gf_mult(0x03, state[2][col]) ^ state[3][col]
                new_state[2][col] = state[0][col] ^ state[1][col] ^ self._gf_mult(0x02, state[2][col]) ^ \
                                   self._gf_mult(0x03, state[3][col])
                new_state[3][col] = self._gf_mult(0x03, state[0][col]) ^ state[1][col] ^ \
                                   state[2][col] ^ self._gf_mult(0x02, state[3][col])
        
        return new_state
    
    def _gf_mult(self, a: int, b: int) -> int:
        """
        Galois Field multiplication.
        
        @param a int - First operand
        @param b int - Second operand
        @returns int - Result of multiplication
        """
        result = 0
        while b:
            if b & 1:
                result ^= a
            a <<= 1
            if a & 0x100:
                a ^= 0x11b  # AES irreducible polynomial
            b >>= 1
        return result & 0xff
    
    def _add_round_key(self, state: List[List[int]], round_key: List[List[int]]) -> List[List[int]]:
        """
        Add round key to the state.
        
        @param state List[List[int]] - Current state matrix
        @param round_key List[List[int]] - Round key to add
        @returns List[List[int]] - State after adding round key
        """
        return [[state[i][j] ^ round_key[i][j] for j in range(4)] for i in range(4)]
    
    def _bytes_to_state(self, data: bytes) -> List[List[int]]:
        """
        Convert 16 bytes to 4x4 state matrix.
        
        @param data bytes - 16 bytes of data
        @returns List[List[int]] - 4x4 state matrix
        """
        state = [[0] * 4 for _ in range(4)]
        for i in range(4):
            for j in range(4):
                state[j][i] = data[i * 4 + j]
        return state
    
    def _state_to_bytes(self, state: List[List[int]]) -> bytes:
        """
        Convert 4x4 state matrix to 16 bytes.
        
        @param state List[List[int]] - 4x4 state matrix
        @returns bytes - 16 bytes of data
        """
        data = bytearray(16)
        for i in range(4):
            for j in range(4):
                data[i * 4 + j] = state[j][i]
        return bytes(data)
    
    def encrypt_block(self, plaintext: bytes) -> bytes:
        """
        Encrypt a single 16-byte block.
        
        @param plaintext bytes - 16 bytes of plaintext
        @returns bytes - 16 bytes of ciphertext
        """
        if len(plaintext) != 16:
            raise ValueError("Block must be exactly 16 bytes")
        
        state = self._bytes_to_state(plaintext)
        
        # Initial round
        state = self._add_round_key(state, self.round_keys[0])
        
        # 9 main rounds
        for round_num in range(1, 10):
            state = self._sub_bytes(state)
            state = self._shift_rows(state)
            state = self._mix_columns(state)
            state = self._add_round_key(state, self.round_keys[round_num])
        
        # Final round
        state = self._sub_bytes(state)
        state = self._shift_rows(state)
        state = self._add_round_key(state, self.round_keys[10])
        
        return self._state_to_bytes(state)
    
    def decrypt_block(self, ciphertext: bytes) -> bytes:
        """
        Decrypt a single 16-byte block.
        
        @param ciphertext bytes - 16 bytes of ciphertext
        @returns bytes - 16 bytes of plaintext
        """
        if len(ciphertext) != 16:
            raise ValueError("Block must be exactly 16 bytes")
        
        state = self._bytes_to_state(ciphertext)
        
        # Initial round
        state = self._add_round_key(state, self.round_keys[10])
        
        # 9 main rounds
        for round_num in range(9, 0, -1):
            state = self._shift_rows(state, inverse=True)
            state = self._sub_bytes(state, inverse=True)
            state = self._add_round_key(state, self.round_keys[round_num])
            state = self._mix_columns(state, inverse=True)
        
        # Final round
        state = self._shift_rows(state, inverse=True)
        state = self._sub_bytes(state, inverse=True)
        state = self._add_round_key(state, self.round_keys[0])
        
        return self._state_to_bytes(state)
    
    def encrypt(self, plaintext: bytes) -> bytes:
        """
        Encrypt data using AES-128 with PKCS7 padding.
        
        @param plaintext bytes - Data to encrypt
        @returns bytes - Encrypted data
        """
        # PKCS7 padding
        padding_length = 16 - (len(plaintext) % 16)
        padded_data = plaintext + bytes([padding_length] * padding_length)
        
        # Encrypt each block
        ciphertext = bytearray()
        for i in range(0, len(padded_data), 16):
            block = padded_data[i:i+16]
            encrypted_block = self.encrypt_block(block)
            ciphertext.extend(encrypted_block)
        
        return bytes(ciphertext)
    
    def decrypt(self, ciphertext: bytes) -> bytes:
        """
        Decrypt data using AES-128 with PKCS7 padding removal.
        
        @param ciphertext bytes - Data to decrypt
        @returns bytes - Decrypted data
        """
        if len(ciphertext) % 16 != 0:
            raise ValueError("Ciphertext length must be multiple of 16")
        
        # Decrypt each block
        plaintext = bytearray()
        for i in range(0, len(ciphertext), 16):
            block = ciphertext[i:i+16]
            decrypted_block = self.decrypt_block(block)
            plaintext.extend(decrypted_block)
        
        # Remove PKCS7 padding
        padding_length = plaintext[-1]
        if padding_length > 16 or padding_length == 0:
            raise ValueError("Invalid padding")
        
        for i in range(padding_length):
            if plaintext[-(i+1)] != padding_length:
                raise ValueError("Invalid padding")
        
        return bytes(plaintext[:-padding_length])


def generate_key() -> bytes:
    """
    Generate a random 128-bit key.
    
    @returns bytes - 16-byte random key
    """
    return os.urandom(16)


def encrypt_message(message: str, key: bytes) -> bytes:
    """
    Encrypt a message string.
    
    @param message str - Message to encrypt
    @param key bytes - Encryption key
    @returns bytes - Encrypted message
    """
    aes = AES(key)
    return aes.encrypt(message.encode('utf-8'))


def decrypt_message(encrypted_message: bytes, key: bytes) -> str:
    """
    Decrypt an encrypted message.
    
    @param encrypted_message bytes - Encrypted message
    @param key bytes - Decryption key
    @returns str - Decrypted message
    """
    aes = AES(key)
    decrypted_bytes = aes.decrypt(encrypted_message)
    return decrypted_bytes.decode('utf-8')


def main():
    """
    Main function to demonstrate AES encryption and decryption.
    """
    print("AES-128 Encryption/Decryption Demo")
    print("=" * 40)
    
    # Generate a random key
    key = generate_key()
    print(f"Generated Key: {key.hex()}")
    
    # Test message
    original_message = "This is a secret message for AES encryption!"
    print(f"Original Message: {original_message}")
    
    # Encrypt the message
    encrypted = encrypt_message(original_message, key)
    print(f"Encrypted (hex): {encrypted.hex()}")
    
    # Decrypt the message
    decrypted = decrypt_message(encrypted, key)
    print(f"Decrypted Message: {decrypted}")
    
    # Verify
    if original_message == decrypted:
        print("✓ Encryption/Decryption successful!")
    else:
        print("✗ Encryption/Decryption failed!")
    
    print("\nBlock-level encryption test:")
    # Test single block encryption
    test_block = b"Hello, AES World!"
    print(f"Test block: {test_block}")
    
    aes = AES(key)
    encrypted_block = aes.encrypt_block(test_block)
    print(f"Encrypted block: {encrypted_block.hex()}")
    
    decrypted_block = aes.decrypt_block(encrypted_block)
    print(f"Decrypted block: {decrypted_block}")
    
    if test_block == decrypted_block:
        print("✓ Block encryption/decryption successful!")
    else:
        print("✗ Block encryption/decryption failed!")


if __name__ == "__main__":
    main()
