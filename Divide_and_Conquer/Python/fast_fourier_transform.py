
import numpy as np

def fft(x):
    N = len(x)

    if N <= 1:
        return x
    else:
        even = fft(x[0::2])
        odd = fft(x[1::2])
        
        T = [np.exp(-2j * np.pi * k / N) * odd[k] for k in range(N // 2)]
        
        return [even[k] + T[k] for k in range(N // 2)] + \
               [even[k] - T[k] for k in range(N // 2)]
